import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface CheatModule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'combat' | 'movement' | 'render' | 'player' | 'world' | 'misc';
  keybind?: string;
  settings?: {
    range?: number;
    speed?: number;
    delay?: number;
    radius?: number;
  };
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<'clickgui' | 'hud' | 'configs' | 'cosmetics'>('clickgui');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [modules, setModules] = useState<CheatModule[]>([
    { id: 'killaura', name: 'KillAura', description: 'Автоматическая атака ближайших мобов', enabled: false, category: 'combat', keybind: 'R', settings: { range: 4, delay: 100 } },
    { id: 'criticals', name: 'Criticals', description: 'Критические удары на каждой атаке', enabled: false, category: 'combat' },
    { id: 'velocity', name: 'Velocity', description: 'Уменьшение отбрасывания при ударе', enabled: false, category: 'combat' },
    { id: 'autoarmor', name: 'AutoArmor', description: 'Автоматическое надевание брони', enabled: false, category: 'combat' },
    { id: 'antibot', name: 'AntiBot', description: 'Игнорирование ботов при атаке', enabled: false, category: 'combat' },
    { id: 'targetstrafe', name: 'TargetStrafe', description: 'Круговое движение вокруг цели', enabled: false, category: 'combat', settings: { radius: 2 } },
    
    { id: 'fly', name: 'Fly', description: 'Режим полета', enabled: false, category: 'movement', keybind: 'F', settings: { speed: 1 } },
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
    { name: 'HvH Config', active: false },
    { name: 'Legit', active: false },
  ]);

  const [hudElements] = useState([
    { name: 'Watermark', enabled: true, position: 'top-left' },
    { name: 'ArrayList', enabled: true, position: 'top-right' },
    { name: 'Coordinates', enabled: true, position: 'bottom-left' },
    { name: 'FPS', enabled: true, position: 'top-left' },
    { name: 'Keystrokes', enabled: false, position: 'bottom-right' },
    { name: 'Target HUD', enabled: true, position: 'center' },
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
  const filteredModules = modules.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-950/20">
      <div className="flex h-screen">
        <aside className="w-64 bg-card border-r border-border flex flex-col">
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-primary glow-green mb-1">GROM CLIENT</h1>
            <p className="text-xs text-muted-foreground">Alpha v1.0 • MC 1.16.5</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveTab('clickgui')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'clickgui' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary text-foreground'
              }`}
            >
              <Icon name="Grid3x3" size={18} />
              <span className="font-medium">ClickGUI</span>
            </button>

            <button
              onClick={() => setActiveTab('hud')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'hud' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary text-foreground'
              }`}
            >
              <Icon name="Layout" size={18} />
              <span className="font-medium">HUD Editor</span>
            </button>

            <button
              onClick={() => setActiveTab('configs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'configs' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary text-foreground'
              }`}
            >
              <Icon name="FolderOpen" size={18} />
              <span className="font-medium">Configs</span>
            </button>

            <button
              onClick={() => setActiveTab('cosmetics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'cosmetics' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary text-foreground'
              }`}
            >
              <Icon name="Sparkles" size={18} />
              <span className="font-medium">Cosmetics</span>
            </button>
          </nav>

          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Активно модулей</span>
              <Badge variant="default" className="text-xs">{enabledCount}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Онлайн</span>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto">
          {activeTab === 'clickgui' && (
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold">Модули клиента</h2>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Поиск модулей..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64"
                    />
                    <Button variant="outline" size="icon" onClick={() => setModules(prev => prev.map(m => ({ ...m, enabled: false })))}>
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {(['combat', 'movement', 'render', 'player', 'world', 'misc'] as const).map(category => {
                const categoryModules = filteredModules.filter(m => m.category === category);
                if (categoryModules.length === 0) return null;

                return (
                  <div key={category} className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-2xl">
                        {category === 'combat' && '⚔️'}
                        {category === 'movement' && '🏃'}
                        {category === 'render' && '👁️'}
                        {category === 'player' && '👤'}
                        {category === 'world' && '🌍'}
                        {category === 'misc' && '🔧'}
                      </div>
                      <h3 className="text-xl font-semibold capitalize">{category}</h3>
                      <Badge variant="outline" className="ml-auto">{categoryModules.length}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {categoryModules.map((module) => (
                        <Card 
                          key={module.id} 
                          className={`p-4 transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                            module.enabled ? 'border-primary border-glow-green bg-primary/5' : 'hover:border-primary/50'
                          }`}
                          onClick={() => toggleModule(module.id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className={`font-semibold ${module.enabled ? 'text-primary glow-green' : ''}`}>
                                  {module.name}
                                </h4>
                                {module.keybind && (
                                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                    {module.keybind}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{module.description}</p>
                            </div>
                            <Switch 
                              checked={module.enabled}
                              onClick={(e) => e.stopPropagation()}
                              onCheckedChange={() => toggleModule(module.id)}
                              className="ml-2"
                            />
                          </div>
                          
                          {module.settings && module.enabled && (
                            <div className="space-y-2 pt-3 border-t border-border mt-2" onClick={(e) => e.stopPropagation()}>
                              {module.settings.range !== undefined && (
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <label className="text-[10px] font-medium uppercase text-muted-foreground">Range</label>
                                    <span className="text-[10px] text-primary">{module.settings.range}</span>
                                  </div>
                                  <Slider
                                    value={[module.settings.range]}
                                    onValueChange={(value) => updateModuleSetting(module.id, 'range', value[0])}
                                    min={1}
                                    max={10}
                                    step={0.5}
                                    className="h-1"
                                  />
                                </div>
                              )}
                              {module.settings.speed !== undefined && (
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <label className="text-[10px] font-medium uppercase text-muted-foreground">Speed</label>
                                    <span className="text-[10px] text-primary">{module.settings.speed}x</span>
                                  </div>
                                  <Slider
                                    value={[module.settings.speed]}
                                    onValueChange={(value) => updateModuleSetting(module.id, 'speed', value[0])}
                                    min={1}
                                    max={5}
                                    step={0.5}
                                    className="h-1"
                                  />
                                </div>
                              )}
                              {module.settings.delay !== undefined && (
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <label className="text-[10px] font-medium uppercase text-muted-foreground">Delay</label>
                                    <span className="text-[10px] text-primary">{module.settings.delay}ms</span>
                                  </div>
                                  <Slider
                                    value={[module.settings.delay]}
                                    onValueChange={(value) => updateModuleSetting(module.id, 'delay', value[0])}
                                    min={50}
                                    max={500}
                                    step={10}
                                    className="h-1"
                                  />
                                </div>
                              )}
                              {module.settings.radius !== undefined && (
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <label className="text-[10px] font-medium uppercase text-muted-foreground">Radius</label>
                                    <span className="text-[10px] text-primary">{module.settings.radius}</span>
                                  </div>
                                  <Slider
                                    value={[module.settings.radius]}
                                    onValueChange={(value) => updateModuleSetting(module.id, 'radius', value[0])}
                                    min={1}
                                    max={6}
                                    step={1}
                                    className="h-1"
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'hud' && (
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-6">HUD Editor</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Элементы HUD</h3>
                  <div className="space-y-3">
                    {hudElements.map((element, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <div>
                          <div className="font-medium">{element.name}</div>
                          <div className="text-xs text-muted-foreground">{element.position}</div>
                        </div>
                        <Switch defaultChecked={element.enabled} />
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 border-primary border-glow-green">
                  <h3 className="text-xl font-semibold mb-4">Превью</h3>
                  <div className="bg-secondary/30 rounded-lg p-6 relative min-h-[400px] border border-border">
                    <div className="absolute top-4 left-4">
                      <div className="text-primary text-sm font-bold glow-green">GROM CLIENT</div>
                      <div className="text-xs text-muted-foreground mt-1">240 FPS | 12ms</div>
                    </div>
                    
                    <div className="absolute top-4 right-4 space-y-1 text-right">
                      {modules.filter(m => m.enabled).slice(0, 6).map(m => (
                        <div key={m.id} className="text-primary text-sm font-medium glow-green animate-fade-in">
                          {m.name}
                        </div>
                      ))}
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <div className="text-xs text-muted-foreground font-mono">
                        X: 256 Y: 64 Z: -128
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'configs' && (
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-6">Конфигурации</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {configs.map((config, idx) => (
                  <Card 
                    key={idx} 
                    className={`p-5 cursor-pointer transition-all hover:scale-105 ${
                      config.active ? 'border-primary border-glow-green bg-primary/5' : 'hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`text-lg font-semibold ${config.active ? 'text-primary glow-green' : ''}`}>
                        {config.name}
                      </h3>
                      {config.active && (
                        <Icon name="Check" size={18} className="text-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                      {config.active ? 'Активная конфигурация' : 'Нажмите для загрузки'}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        <Icon name="Download" size={12} className="mr-1" />
                        Load
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Icon name="Trash2" size={12} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6">
                <Button className="w-full" size="lg">
                  <Icon name="Plus" size={18} className="mr-2" />
                  Создать новую конфигурацию
                </Button>
              </Card>
            </div>
          )}

          {activeTab === 'cosmetics' && (
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-6">Косметика</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Cape', 'Wings', 'Hat', 'Pet', 'Kill Effect', 'Death Animation'].map((cosmetic, idx) => (
                  <Card key={idx} className="p-6 hover:border-primary/50 transition-all cursor-pointer">
                    <div className="aspect-square bg-secondary/50 rounded-lg mb-4 flex items-center justify-center">
                      <Icon name="Sparkles" size={48} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-1">{cosmetic}</h3>
                    <p className="text-xs text-muted-foreground mb-3">Доступно в магазине</p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Icon name="ShoppingCart" size={14} className="mr-2" />
                      Купить
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
