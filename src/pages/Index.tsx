import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface CheatModule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  settings?: {
    range?: number;
    speed?: number;
  };
}

const Index = () => {
  const [modules, setModules] = useState<CheatModule[]>([
    { id: 'killaura', name: 'KillAura', description: 'Автоматическая атака ближайших мобов', enabled: false, settings: { range: 4 } },
    { id: 'esp', name: 'ESP', description: 'Подсветка игроков и мобов через стены', enabled: false },
    { id: 'fly', name: 'Fly', description: 'Режим полета', enabled: false, settings: { speed: 1 } },
    { id: 'speed', name: 'Speed', description: 'Увеличение скорости передвижения', enabled: false, settings: { speed: 2 } },
    { id: 'nofall', name: 'NoFall', description: 'Отключение урона от падения', enabled: false },
    { id: 'freecam', name: 'Freecam', description: 'Свободная камера', enabled: false },
  ]);

  const [configs] = useState([
    { name: 'Default', active: true },
    { name: 'PvP Pro', active: false },
    { name: 'Survival', active: false },
  ]);

  const [hudElements] = useState([
    { name: 'Coordinates', enabled: true },
    { name: 'FPS Counter', enabled: true },
    { name: 'Watermark', enabled: true },
    { name: 'Module List', enabled: true },
  ]);

  const toggleModule = (id: string) => {
    setModules(prev => prev.map(mod => 
      mod.id === id ? { ...mod, enabled: !mod.enabled } : mod
    ));
    const module = modules.find(m => m.id === id);
    if (module) {
      toast.success(`${module.name} ${!module.enabled ? 'включен' : 'выключен'}`);
    }
  };

  const updateModuleSetting = (id: string, setting: string, value: number) => {
    setModules(prev => prev.map(mod => 
      mod.id === id ? { ...mod, settings: { ...mod.settings, [setting]: value } } : mod
    ));
  };

  const enabledCount = modules.filter(m => m.enabled).length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold glow-green text-primary mb-2">GROM CLIENT</h1>
            <p className="text-muted-foreground">Minecraft 1.16.5 Advanced Client</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={enabledCount > 0 ? "default" : "secondary"} className="text-lg px-4 py-2">
              <Icon name="Zap" size={16} className="mr-2" />
              {enabledCount} активных модулей
            </Badge>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Онлайн</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="modules" className="gap-2">
              <Icon name="Grid3x3" size={16} />
              Модули
            </TabsTrigger>
            <TabsTrigger value="hud" className="gap-2">
              <Icon name="Layout" size={16} />
              HUD
            </TabsTrigger>
            <TabsTrigger value="configs" className="gap-2">
              <Icon name="Settings" size={16} />
              Конфиги
            </TabsTrigger>
            <TabsTrigger value="info" className="gap-2">
              <Icon name="Info" size={16} />
              Инфо
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map((module) => (
                <Card key={module.id} className={`p-6 transition-all duration-300 ${module.enabled ? 'border-glow-green border-primary' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`text-xl font-semibold ${module.enabled ? 'text-primary glow-green' : ''}`}>
                          {module.name}
                        </h3>
                        <Badge variant={module.enabled ? "default" : "outline"} className="text-xs">
                          {module.enabled ? 'ON' : 'OFF'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                    <Switch 
                      checked={module.enabled}
                      onCheckedChange={() => toggleModule(module.id)}
                    />
                  </div>
                  
                  {module.settings && module.enabled && (
                    <div className="space-y-4 pt-4 border-t border-border">
                      {module.settings.range !== undefined && (
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium">Дальность</label>
                            <span className="text-sm text-primary">{module.settings.range}</span>
                          </div>
                          <Slider
                            value={[module.settings.range]}
                            onValueChange={(value) => updateModuleSetting(module.id, 'range', value[0])}
                            min={1}
                            max={10}
                            step={0.5}
                          />
                        </div>
                      )}
                      {module.settings.speed !== undefined && (
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium">Скорость</label>
                            <span className="text-sm text-primary">{module.settings.speed}x</span>
                          </div>
                          <Slider
                            value={[module.settings.speed]}
                            onValueChange={(value) => updateModuleSetting(module.id, 'speed', value[0])}
                            min={1}
                            max={5}
                            step={0.5}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hud" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Layout" size={24} />
                Элементы HUD
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hudElements.map((element, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                    <div className="flex items-center gap-3">
                      <Icon name="Monitor" size={20} className="text-primary" />
                      <span className="font-medium">{element.name}</span>
                    </div>
                    <Switch defaultChecked={element.enabled} />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-primary border-glow-green">
              <h4 className="text-lg font-semibold mb-4 text-primary">Превью HUD</h4>
              <div className="bg-secondary/30 rounded-lg p-8 relative min-h-[300px] border border-border">
                <div className="absolute top-4 left-4">
                  <div className="text-primary text-sm font-mono glow-green">GROM CLIENT v1.0</div>
                  <div className="text-xs text-muted-foreground mt-1">FPS: 240 | Ping: 12ms</div>
                </div>
                <div className="absolute top-4 right-4 text-right">
                  <div className="text-xs text-muted-foreground font-mono">X: 256 Y: 64 Z: -128</div>
                  <div className="text-xs text-muted-foreground mt-1">Биом: Plains</div>
                </div>
                <div className="absolute bottom-4 right-4 space-y-1">
                  {modules.filter(m => m.enabled).map(m => (
                    <div key={m.id} className="text-primary text-sm font-medium text-right glow-green">
                      {m.name}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="configs" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {configs.map((config, idx) => (
                <Card key={idx} className={`p-6 cursor-pointer transition-all ${config.active ? 'border-primary border-glow-green' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-semibold ${config.active ? 'text-primary glow-green' : ''}`}>
                      {config.name}
                    </h3>
                    {config.active && (
                      <Badge variant="default">
                        <Icon name="Check" size={14} />
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {config.active ? 'Активная конфигурация' : 'Нажмите для загрузки'}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Icon name="Download" size={14} className="mr-2" />
                      Загрузить
                    </Button>
                    <Button size="sm" variant="outline">
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            <Card className="p-6">
              <Button className="w-full" size="lg">
                <Icon name="Plus" size={18} className="mr-2" />
                Создать новый конфиг
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-6 text-primary glow-green">GROM CLIENT</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Версия клиента</span>
                  <span className="font-semibold">1.0.0</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Версия Minecraft</span>
                  <span className="font-semibold">1.16.5</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Загружено модулей</span>
                  <span className="font-semibold">{modules.length}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Активных модулей</span>
                  <span className="font-semibold text-primary">{enabledCount}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground">Статус</span>
                  <Badge variant="default">Онлайн</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-primary border-glow-green">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="Shield" size={20} className="text-primary" />
                Оптимизация
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Оптимизация рендера</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ускорение физики</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Кэширование чанков</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
