import { useIntlayer } from "react-intlayer";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { exportAsJpeg, exportAsPng } from "@/lib/file-utils";
import { getPluginLabel } from "@/lib/svgo-plugins";
import { useSvgStore } from "@/store/svg-store";

type ConfigPanelProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
};

export function ConfigPanel({
  isCollapsed,
  onToggleCollapse,
  className,
}: ConfigPanelProps) {
  const {
    plugins,
    globalSettings,
    togglePlugin,
    updateGlobalSettings,
    resetPlugins,
    compressedSvg,
    fileName,
  } = useSvgStore();
  const { settings, messages } = useIntlayer("optimize");

  if (isCollapsed) {
    return <div className={className} />;
  }

  const handleExportPng = async () => {
    if (!compressedSvg) {
      toast.error(messages.noSvgToExport);
      return;
    }
    try {
      await exportAsPng(compressedSvg, fileName);
      toast.success(messages.exportPngSuccess);
    } catch {
      toast.error(messages.exportError);
    }
  };

  const handleExportJpeg = async () => {
    if (!compressedSvg) {
      toast.error(messages.noSvgToExport);
      return;
    }
    try {
      await exportAsJpeg(compressedSvg, fileName);
      toast.success(messages.exportJpegSuccess);
    } catch {
      toast.error(messages.exportError);
    }
  };

  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-lg">{settings.title}</h2>
        <Button
          onClick={onToggleCollapse}
          size="sm"
          type="button"
          variant="ghost"
        >
          <span className="i-hugeicons-arrow-right-02 size-4" />
        </Button>
      </div>

      <div className="max-h-[calc(100vh-9rem)] space-y-4 overflow-y-auto">
        {/* Global Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{settings.global.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm" htmlFor="show-original">
                {settings.global.showOriginal}
              </Label>
              <Switch
                checked={globalSettings.showOriginal}
                id="show-original"
                onCheckedChange={(checked) =>
                  updateGlobalSettings({ showOriginal: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm" htmlFor="compare-gzipped">
                {settings.global.compareGzipped}
              </Label>
              <Switch
                checked={globalSettings.compareGzipped}
                id="compare-gzipped"
                onCheckedChange={(checked) =>
                  updateGlobalSettings({ compareGzipped: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm" htmlFor="prettify">
                {settings.global.prettifyMarkup}
              </Label>
              <Switch
                checked={globalSettings.prettifyMarkup}
                id="prettify"
                onCheckedChange={(checked) =>
                  updateGlobalSettings({ prettifyMarkup: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm" htmlFor="multipass">
                {settings.global.multipass}
              </Label>
              <Switch
                checked={globalSettings.multipass}
                id="multipass"
                onCheckedChange={(checked) =>
                  updateGlobalSettings({ multipass: checked })
                }
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm" htmlFor="float-precision">
                {settings.global.numberPrecision}
              </Label>
              <Input
                className="h-8"
                id="float-precision"
                max={10}
                min={0}
                onChange={(e) =>
                  updateGlobalSettings({
                    floatPrecision: Number.parseInt(e.target.value, 10),
                  })
                }
                type="number"
                value={globalSettings.floatPrecision}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm" htmlFor="transform-precision">
                {settings.global.transformPrecision}
              </Label>
              <Input
                className="h-8"
                id="transform-precision"
                max={10}
                min={0}
                onChange={(e) =>
                  updateGlobalSettings({
                    transformPrecision: Number.parseInt(e.target.value, 10),
                  })
                }
                type="number"
                value={globalSettings.transformPrecision}
              />
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {settings.features.title}
              </CardTitle>
              <Button
                onClick={resetPlugins}
                size="sm"
                type="button"
                variant="ghost"
              >
                {settings.features.resetAll}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {plugins.map((plugin) => (
              <div
                className="flex items-center justify-between py-1"
                key={plugin.name}
              >
                <Label className="cursor-pointer text-sm" htmlFor={plugin.name}>
                  {getPluginLabel(plugin.name)}
                </Label>
                <Switch
                  checked={plugin.enabled}
                  id={plugin.name}
                  onCheckedChange={() => togglePlugin(plugin.name)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{settings.export.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              className="w-full"
              disabled={!compressedSvg}
              onClick={handleExportPng}
              type="button"
              variant="outline"
            >
              <span className="i-hugeicons-image-02 mr-2 size-4" />
              {settings.export.png}
            </Button>
            <Button
              className="w-full"
              disabled={!compressedSvg}
              onClick={handleExportJpeg}
              type="button"
              variant="outline"
            >
              <span className="i-hugeicons-image-02 mr-2 size-4" />
              {settings.export.jpeg}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
