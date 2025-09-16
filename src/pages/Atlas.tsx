import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Map, 
  Layers, 
  Filter, 
  MapPin, 
  Users, 
  Leaf,
  Droplet
} from 'lucide-react';

export const Atlas = () => {
  const { user } = useAuth();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [selectedState, setSelectedState] = useState('chhattisgarh');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [activeLayer, setActiveLayer] = useState('fra-claims');

  // Mock layer data
  const layerStats = {
    'fra-claims': { count: 156, color: '#22c55e', name: 'FRA Claims' },
    'community-rights': { count: 89, color: '#3b82f6', name: 'Community Rights' },
    'pending-claims': { count: 42, color: '#f59e0b', name: 'Pending Claims' }
  };

  // Mock GeoJSON data for demo
  const mockClaims = [
    {
      id: 'FRA/CGH/BST/2024/001',
      coordinates: [81.2849, 19.1383],
      beneficiary: 'Ramesh Kumar',
      status: 'approved',
      landArea: 2.5,
      village: 'Kondagaon'
    },
    {
      id: 'FRA/CGH/BST/2024/002',
      coordinates: [81.3849, 19.2383],
      beneficiary: 'Sunita Devi',
      status: 'pending',
      landArea: 1.8,
      village: 'Tokapal'
    },
    {
      id: 'FRA/CGH/BST/2024/003',
      coordinates: [81.1849, 19.0383],
      beneficiary: 'Mohan Lal',
      status: 'community',
      landArea: 3.2,
      village: 'Bhanupratappur'
    }
  ];

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm'
          },
        ]
      },
      center: [81.2849, 19.1383], // Chhattisgarh center
      zoom: 8
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

     // Add water and forest layers after map loads
    map.current.on('load', () => {
      // Add water bodies layer
      map.current!.addSource('water-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [81.25, 19.10],
                  [81.30, 19.10],
                  [81.30, 19.15],
                  [81.25, 19.15],
                  [81.25, 19.10]
                ]]
              },
              properties: { type: 'reservoir' }
            }
          ]
        }
      });

      map.current!.addLayer({
        id: 'water-layer',
        type: 'fill',
        source: 'water-source',
        paint: {
          'fill-color': '#0080ff',
          'fill-opacity': 0.6
        }
      });

      // Add forest layer
      map.current!.addSource('forest-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [81.20, 19.08],
                  [81.35, 19.08],
                  [81.35, 19.18],
                  [81.20, 19.18],
                  [81.20, 19.08]
                ]]
              },
              properties: { type: 'dense_forest' }
            }
          ]
        }
      });

      map.current!.addLayer({
        id: 'forest-layer',
        type: 'fill',
        source: 'forest-source',
        paint: {
          'fill-color': '#1a5f1a',
          'fill-opacity': 0.4
        }
      });

      // Add markers for claims
      mockClaims.forEach(claim => {
        const color = claim.status === 'approved' ? '#22c55e' : 
                     claim.status === 'pending' ? '#f59e0b' : '#3b82f6';

        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.cssText = `
          width: 12px;
          height: 12px;
          background-color: ${color};
          border: 2px solid white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;

        // Create popup
        const popup = new maplibregl.Popup({
          offset: 15,
          closeButton: true,
          closeOnClick: true
        }).setHTML(`
          <div class="p-3">
            <h3 class="font-semibold text-sm mb-2">${claim.id}</h3>
            <div class="space-y-1 text-xs">
              <div><strong>Beneficiary:</strong> ${claim.beneficiary}</div>
              <div><strong>Village:</strong> ${claim.village}</div>
              <div><strong>Land Area:</strong> ${claim.landArea} acres</div>
              <div><strong>Status:</strong> 
                <span class="px-1.5 py-0.5 rounded text-xs font-medium ${
                  claim.status === 'approved' ? 'bg-green-100 text-green-800' :
                  claim.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }">
                  ${claim.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        `);

        // Add marker to map
        new maplibregl.Marker(el)
          .setLngLat([claim.coordinates[0], claim.coordinates[1]])
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const layerOptions = [
    { id: 'fra-claims', name: 'FRA Claims', icon: Leaf, color: 'text-success' },
    { id: 'community-rights', name: 'Community Rights', icon: Users, color: 'text-primary' },
    { id: 'pending-claims', name: 'Pending Claims', icon: MapPin, color: 'text-warning' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold gov-heading flex items-center space-x-3">
              <Map className="w-8 h-8 text-primary" />
              <span>FRA Atlas</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Interactive map of Forest Rights Act claims and community lands
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-3">
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                <SelectItem value="odisha">Odisha</SelectItem>
                <SelectItem value="jharkhand">Jharkhand</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                <SelectItem value="bastar">Bastar</SelectItem>
                <SelectItem value="kanker">Kanker</SelectItem>
                <SelectItem value="kondagaon">Kondagaon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Layers className="w-5 h-5" />
                    <span>Interactive Map</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {user?.role === 'user' ? 'Personal View' : 
                       user?.role === 'officer' ? 'District View' : 'State View'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div ref={mapContainer} className="w-full h-[600px] rounded-b-lg" />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Layer Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Map Layers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {layerOptions.map((layer) => {
                  const Icon = layer.icon;
                  const stats = layerStats[layer.id as keyof typeof layerStats];
                  return (
                    <Button
                      key={layer.id}
                      variant={activeLayer === layer.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setActiveLayer(layer.id)}
                    >
                      <Icon className={`w-4 h-4 mr-3 ${layer.color}`} />
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span>{layer.name}</span>
                          <Badge variant="secondary" className="ml-2">
                            {stats.count}
                          </Badge>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-success rounded-full border-2 border-white shadow-sm"></div>
                  <span className="text-sm">Approved Claims</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-warning rounded-full border-2 border-white shadow-sm"></div>
                  <span className="text-sm">Pending Claims</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-sm"></div>
                  <span className="text-sm">Community Rights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-destructive rounded-full border-2 border-white shadow-sm"></div>
                  <span className="text-sm">Rejected Claims</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-sm text-muted-foreground">Total Claims</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-success">89</div>
                    <div className="text-xs text-muted-foreground">Approved</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-warning">42</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>
                <div className="text-center pt-2 border-t">
                  <div className="text-lg font-bold">245.8 acres</div>
                  <div className="text-xs text-muted-foreground">Total Land Approved</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};