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
  category: 'combat' | 'movement' | 'render' | 'player' | 'world' | 'misc';
  settings?: {
    range?: number;
    speed?: number;
    delay?: number;
    radius?: number;
  };
}

const Index = () => {
  const [modules, setModules] = useState<CheatModule[]>([
    { id: 'killaura', name: 'KillAura', description: 'Автоматическая атака ближайших мобов', enabled: false, category: 'combat', settings: { range: 4, delay: 100 } },
    { id: 'criticals', name: 'Criticals', description: 'Критические удары на каждой атаке', enabled: false, category: 'combat' },
    { id: 'velocity', name: 'Velocity', description: 'Уменьшение отбрасывания при ударе', enabled: false, category: 'combat' },
    { id: 'autoarmor', name: 'AutoArmor', description: 'Автоматическое надевание брони', enabled: false, category: 'combat' },
    { id: 'antibot', name: 'AntiBot', description: 'Игнорирование ботов при атаке', enabled: false, category: 'combat' },
    { id: 'targetstrafe', name: 'TargetStrafe', description: 'Круговое движение вокруг цели', enabled: false, category: 'combat', settings: { radius: 2 } },
    
    { id: 'fly', name: 'Fly', description: 'Режим полета', enabled: false, category: 'movement', settings: { speed: 1 } },
    { id: 'speed', name: 'Speed', description: 'Увеличение скорости передвижения', enabled: false, category: 'movement', settings: { speed: 2 } },
    { id: 'nofall', name: 'NoFall', description: 'Отключение урона от падения', enabled: false, category: 'movement' },
    { id: 'spider', name: 'Spider', description: 'Подъем по стенам', enabled: false, category: 'movement' },
    { id: 'step', name: 'Step', description: 'Подъем на высокие блоки', enabled: false, category: 'movement' },
    { id: 'longjump', name: 'LongJump', description: 'Дальние прыжки', enabled: false, category: 'movement' },
    { id: 'jesus', name: 'Jesus', description: 'Ходьба по воде', enabled: false, category: 'movement' },
    { id: 'airjump', name: 'AirJump', description: 'Прыжки в воздухе', enabled: false, category: 'movement' },
    
    { id: 'esp', name: 'ESP', description: 'Подсветка игроков и мобов через стены', enabled: false, category: 'render' },
    { id: 'freecam', name: 'Freecam', description: 'Свободная камера', enabled: false, category: 'render' },
    { id: 'tracers', name: 'Tracers', description: 'Линии к игрокам', enabled: false, category: 'render' },
    { id: 'chams', name: 'Chams', description: 'Окрашивание игроков', enabled: false, category: 'render' },
    { id: 'fullbright', name: 'FullBright', description: 'Максимальная яркость', enabled: false, category: 'render' },
    { id: 'nametags', name: 'NameTags', description: 'Улучшенные ники игроков', enabled: false, category: 'render' },
    { id: 'xray', name: 'XRay', description: 'Видимость руд через блоки', enabled: false, category: 'render' },
    
    { id: 'norotate', name: 'NoRotate', description: 'Отключение поворота головы', enabled: false, category: 'player' },
    { id: 'noslow', name: 'NoSlow', description: 'Отключение замедления', enabled: false, category: 'player' },
    { id: 'autoeat', name: 'AutoEat', description: 'Автоматическое употребление еды', enabled: false, category: 'player' },
    { id: 'autotool', name: 'AutoTool', description: 'Автовыбор инструмента', enabled: false, category: 'player' },
    { id: 'inventorymove', name: 'InventoryMove', description: 'Движение с открытым инвентарем', enabled: false, category: 'player' },
    
    { id: 'nuker', name: 'Nuker', description: 'Быстрая ломка блоков вокруг', enabled: false, category: 'world', settings: { radius: 3 } },
    { id: 'scaffold', name: 'Scaffold', description: 'Автоматическая постройка под ногами', enabled: false, category: 'world' },
    { id: 'timer', name: 'Timer', description: 'Ускорение игры', enabled: false, category: 'world', settings: { speed: 2 } },
    { id: 'fastbreak', name: 'FastBreak', description: 'Ускоренная ломка блоков', enabled: false, category: 'world' },
    { id: 'cheststealer', name: 'ChestStealer', description: 'Автокража из сундуков', enabled: false, category: 'world' },
    
    { id: 'autoclicker', name: 'AutoClicker', description: 'Автоматические клики', enabled: false, category: 'misc', settings: { delay: 100 } },
    { id: 'antiafk', name: 'AntiAFK', description: 'Защита от кика за неактивность', enabled: false, category: 'misc' },
    { id: 'clicktp', name: 'ClickTP', description: 'Телепортация по клику', enabled: false, category: 'misc' },
    { id: 'middleclick', name: 'MiddleClickPearl', description: 'Бросок эндер жемчуга по СКМ', enabled: false, category: 'misc' },
    { id: 'autorespawn', name: 'AutoRespawn', description: 'Автореспавн после смерти', enabled: false, category: 'misc' },
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

          <TabsContent value="modules" className="space-y-6">
            <div className="flex gap-2 flex-wrap mb-4">
              <Button variant="outline" size="sm" onClick={() => setModules(prev => prev.map(m => ({ ...m, enabled: false })))}>
                <Icon name="X" size={14} className="mr-2" />
                Отключить все
              </Button>
              {['combat', 'movement', 'render', 'player', 'world', 'misc'].map(cat => (
                <Badge key={cat} variant="secondary" className="text-xs px-3 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  {cat === 'combat' && '⚔️ Бой'}
                  {cat === 'movement' && '🏃 Движение'}
                  {cat === 'render' && '👁️ Отображение'}
                  {cat === 'player' && '👤 Игрок'}
                  {cat === 'world' && '🌍 Мир'}
                  {cat === 'misc' && '🔧 Разное'}
                </Badge>
              ))}
            </div>

            {(['combat', 'movement', 'render', 'player', 'world', 'misc'] as const).map(category => (
              <div key={category}>
                <h3 className="text-xl font-semibold mb-3 text-primary flex items-center gap-2">
                  {category === 'combat' && '⚔️ Бой'}
                  {category === 'movement' && '🏃 Движение'}
                  {category === 'render' && '👁️ Отображение'}
                  {category === 'player' && '👤 Игрок'}
                  {category === 'world' && '🌍 Мир'}
                  {category === 'misc' && '🔧 Разное'}
                  <Badge variant="outline" className="ml-auto">
                    {modules.filter(m => m.category === category).length} модулей
                  </Badge>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {modules.filter(m => m.category === category).map((module) => (
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
                    <div className="space-y-3 pt-4 border-t border-border">
                      {module.settings.range !== undefined && (
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-xs font-medium">Дальность</label>
                            <span className="text-xs text-primary">{module.settings.range}</span>
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
                            <label className="text-xs font-medium">Скорость</label>
                            <span className="text-xs text-primary">{module.settings.speed}x</span>
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
                      {module.settings.delay !== undefined && (
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-xs font-medium">Задержка</label>
                            <span className="text-xs text-primary">{module.settings.delay}ms</span>
                          </div>
                          <Slider
                            value={[module.settings.delay]}
                            onValueChange={(value) => updateModuleSetting(module.id, 'delay', value[0])}
                            min={50}
                            max={500}
                            step={10}
                          />
                        </div>
                      )}
                      {module.settings.radius !== undefined && (
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-xs font-medium">Радиус</label>
                            <span className="text-xs text-primary">{module.settings.radius}</span>
                          </div>
                          <Slider
                            value={[module.settings.radius]}
                            onValueChange={(value) => updateModuleSetting(module.id, 'radius', value[0])}
                            min={1}
                            max={6}
                            step={1}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </Card>
                  ))}
                </div>
              </div>
            ))}
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-3xl font-bold text-primary">{modules.length}</div>
                  <div className="text-sm text-muted-foreground mt-1">Всего модулей</div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-3xl font-bold text-primary">{enabledCount}</div>
                  <div className="text-sm text-muted-foreground mt-1">Активно</div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-3xl font-bold">1.16.5</div>
                  <div className="text-sm text-muted-foreground mt-1">Minecraft</div>
                </div>
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <div className="text-3xl font-bold">v1.0</div>
                  <div className="text-sm text-muted-foreground mt-1">Версия</div>
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