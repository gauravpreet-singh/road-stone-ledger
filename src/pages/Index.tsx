import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  DollarSign, 
  Globe, 
  Calendar,
  BarChart3,
  Plus,
  Search
} from "lucide-react";

// Mock data
const materials = [
  { id: 1, name: "Sand", quantity: 20000, unit: "tons", price: 35, stock: "High", trend: "up", country: "Local" },
  { id: 2, name: "Gravel", quantity: 8500, unit: "tons", price: 30, stock: "Medium", trend: "up", country: "Local" },
  { id: 3, name: "Crushed Stone", quantity: 12000, unit: "tons", price: 35, stock: "High", trend: "down", country: "Local" },
  { id: 4, name: "Bitumen", quantity: 500, unit: "tons", price: 850, stock: "Low", trend: "up", country: "Venezuela" },
  { id: 5, name: "Portland Cement", quantity: 2000, unit: "tons", price: 120, stock: "Medium", trend: "up", country: "China" },
  { id: 6, name: "Soil", quantity: 20000, unit: "tons", price: 15, stock: "High", trend: "stable", country: "Local" },
  { id: 7, name: "Admixtures", quantity: 150, unit: "tons", price: 2500, stock: "Medium", trend: "down", country: "Germany" },
];

const importData = [
  { country: "China", materials: ["Portland Cement"], value: 240000, percentage: 35 },
  { country: "Venezuela", materials: ["Bitumen"], value: 425000, percentage: 25 },
  { country: "Germany", materials: ["Admixtures"], value: 375000, percentage: 22 },
  { country: "Local", materials: ["Sand", "Gravel", "Crushed Stone", "Soil"], value: 306000, percentage: 18 },
];

const monthlyData = [
  { month: "Jan", total: 58500 },
  { month: "Feb", total: 62000 },
  { month: "Mar", total: 71500 },
  { month: "Current", total: 58000 },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <div className="h-4 w-4" />;
  };

  const getStockColor = (stock: string) => {
    if (stock === "High") return "success";
    if (stock === "Medium") return "warning";
    return "destructive";
  };

  const totalValue = materials.reduce((sum, material) => sum + (material.quantity * material.price), 0);
  const totalQuantity = materials.reduce((sum, material) => sum + material.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Road Construction Materials</h1>
              <p className="text-muted-foreground mt-1">Inventory & Import Tracking System</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Material
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Materials</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{materials.length}</div>
              <p className="text-xs text-muted-foreground">Active materials tracked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Quantity</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalQuantity.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Tons in inventory</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Current inventory value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Import Sources</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{importData.length}</div>
              <p className="text-xs text-muted-foreground">Countries sourcing from</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="imports">Imports</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Report</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Materials Inventory</CardTitle>
                    <CardDescription>Current stock levels and pricing information</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search materials..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Stock Level</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Total Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.name}</TableCell>
                        <TableCell>{material.quantity.toLocaleString()} {material.unit}</TableCell>
                        <TableCell>${material.price}</TableCell>
                        <TableCell>
                          <Badge variant={getStockColor(material.stock) as any}>
                            {material.stock}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getTrendIcon(material.trend)}
                          </div>
                        </TableCell>
                        <TableCell>{material.country}</TableCell>
                        <TableCell>${(material.quantity * material.price).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {materials.map((material) => (
                <Card key={material.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{material.name}</CardTitle>
                    <CardDescription>Current pricing and trend</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold">${material.price}</div>
                      <div className="flex items-center">
                        {getTrendIcon(material.trend)}
                        <span className="ml-1 text-sm text-muted-foreground">per {material.unit.slice(0, -1)}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Quantity:</span>
                        <span>{material.quantity.toLocaleString()} {material.unit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Value:</span>
                        <span>${(material.quantity * material.price).toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="imports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Import Sources</CardTitle>
                <CardDescription>Breakdown of materials imported from different countries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {importData.map((source, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{source.country}</h3>
                          <p className="text-sm text-muted-foreground">
                            {source.materials.join(", ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${source.value.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{source.percentage}%</div>
                        </div>
                      </div>
                      <Progress value={source.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Quantity Report</CardTitle>
                <CardDescription>Monthly material acquisition summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold">{month.month}</h3>
                          <p className="text-sm text-muted-foreground">
                            {month.month === "Current" ? "This month" : `${month.month} 2024`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{month.total.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">tons acquired</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;