import { useRef, useState } from "react";
import placeholder from "@/assets/placeholder-image.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Save, Trash2, Type, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export type FieldSettings = {
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  fontWeight?: "normal" | "bold";
  fontStyle?: "normal" | "italic";
  textDecoration?: "none" | "underline";
  textAlign?: "left" | "center" | "right";
  letterSpacing?: number;
  lineHeight?: number;
  backgroundColor?: string;
  opacity?: number;
  rotation?: number;
  borderRadius?: number;
  padding?: number;
};

export type TemplateField = {
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  settings: FieldSettings;
};

type Props = {
thumbnail: string;
  fields: TemplateField[];
  addField: (f: TemplateField) => void;
  setSelectedField: (id: number | null) => void;
  selectedField: number | null;
  updateField: (id: number, patch: Partial<TemplateField>) => void;
  setFields: (fields: TemplateField[]) => void;
  removeField: (id: number) => void;
  moveField: (id: number, x: number, y: number) => void;
  saveFields: () => void;
};

const FONT_FAMILIES = ["Inter", "Georgia", "Times New Roman", "Courier New", "Arial", "Helvetica"];

export default function FieldCreator({
    thumbnail,
  fields,
  addField,
  setSelectedField,
  selectedField,
  updateField,
  removeField,
  moveField,
  saveFields,
}: Props) {
  const [dragging, setDragging] = useState<number | null>(null);

    const canvasRef = useRef<HTMLDivElement>(null);

  const current = fields.find((f) => f.id === selectedField);
  const s: FieldSettings = current?.settings ?? {};

  const patchSettings = (patch: Partial<FieldSettings>) => {
    if (!selectedField || !current) return;
    updateField(selectedField, { settings: { ...current.settings, ...patch } });
  };


  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_340px]">
        {/* Canvas */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b p-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Template Editor</h2>
              <p className="text-xs text-muted-foreground">Click a field to edit • drag to reposition</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                    addField({
                    id: Date.now(),
                    name: "Recipient Name",
                    x: 0.15,
                    y: 0.1,
                    width: 0.25,
                    height: 0.035,
                    settings: {
                        color: "#111111",
                        fontSize: 18,
                        fontFamily: "Inter",
                        fontWeight: "normal",
                        textAlign: "left",
                    },
                    })
                }             
                 >
                <Plus className="mr-1.5 h-4 w-4" /> Add field
              </Button>
              <Button size="sm" onClick={saveFields}>
                <Save className="mr-1.5 h-4 w-4" /> Save
              </Button>
            </div>
          </div>

          <div
            ref={canvasRef}
            className="relative select-none bg-muted/30"
            style={{ aspectRatio: " 1 / 1.414" }}
            onMouseMove={(e) => {
              if (dragging === null || !canvasRef.current) return;
              const rect = canvasRef.current.getBoundingClientRect();
              const fx = (e.clientX - rect.left) / rect.width;
              const fy = (e.clientY - rect.top) / rect.height;
              const clampedX = Math.min(Math.max(fx, 0), 1);
              const clampedY = Math.min(Math.max(fy, 0), 1);
              moveField(dragging, clampedX, clampedY);
            }}
            onMouseUp={() => setDragging(null)}
            onMouseLeave={() => setDragging(null)}
            onClick={() => setSelectedField(null)}
          >
            <img
              src={'/storage/' + thumbnail}
              alt="Template background"
              className="pointer-events-none absolute inset-0 h-full w-full"
                onError={(e) => {
    e.currentTarget.src = placeholder;
  }}

            />

            {fields.map((field) => {
              const isSelected = field.id === selectedField;
              return (
                <div
                  key={field.id}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setDragging(field.id);
                    setSelectedField(field.id);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute flex cursor-move items-center transition-shadow ${
                    isSelected ? "ring-2 ring-primary shadow-lg" : "ring-1 ring-border/60 hover:ring-primary/50"
                  }`}
                  style={{
                    left: `${field.x * 100}%`,
                    top: `${field.y * 100}%`,
                    width: `${field.width * 100}%`,
                    height: `${field.height * 100}%`,
                    color: field.settings.color ?? "#000",
                    fontSize: field.settings.fontSize ?? 14,
                    fontFamily: field.settings.fontFamily ?? "Inter",
                    fontWeight: field.settings.fontWeight ?? "normal",
                    fontStyle: field.settings.fontStyle ?? "normal",
                    textDecoration: field.settings.textDecoration ?? "none",
                    textAlign: field.settings.textAlign ?? "left",
                    letterSpacing: `${field.settings.letterSpacing ?? 0}px`,
                    lineHeight: field.settings.lineHeight ?? 1.2,
                    backgroundColor: field.settings.backgroundColor ?? "transparent",
                    opacity: (field.settings.opacity ?? 100) / 100,
                    transform: `rotate(${field.settings.rotation ?? 0}deg)`,
                    borderRadius: field.settings.borderRadius ?? 0,
                    padding: field.settings.padding ?? 4,
                    justifyContent:
                      (field.settings.textAlign ?? "left") === "center"
                        ? "center"
                        : (field.settings.textAlign ?? "left") === "right"
                          ? "flex-end"
                          : "flex-start",
                  }}
                >
                  {field.name}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Sidebar */}
        <Card className="h-fit p-5">
          {!current ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Type className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-medium">No field selected</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Select a field on the canvas to edit its style.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Editing</p>
                  <h3 className="text-base font-semibold">{current.name}</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeField(current.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fname" className="text-xs">Field name</Label>
                <Input
                  id="fname"
                  value={current.name}
                  onChange={(e) => updateField(current.id, { name: e.target.value })}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-xs">Font family</Label>
                <Select
                  value={s.fontFamily ?? "Inter"}
                  onValueChange={(v) => patchSettings({ fontFamily: v })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {FONT_FAMILIES.map((f) => (
                      <SelectItem key={f} value={f} style={{ fontFamily: f }}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Font size</Label>
                  <span className="text-xs text-muted-foreground">{s.fontSize ?? 14}px</span>
                </div>
                <Slider
                  min={8}
                  max={96}
                  step={1}
                  value={[s.fontSize ?? 14]}
                  onValueChange={([v]) => patchSettings({ fontSize: v })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs">Text color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={s.color ?? "#000000"}
                      onChange={(e) => patchSettings({ color: e.target.value })}
                      className="h-9 w-9 cursor-pointer rounded border border-input bg-background"
                    />
                    <Input
                      value={s.color ?? "#000000"}
                      onChange={(e) => patchSettings({ color: e.target.value })}
                      className="font-mono text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Background</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={s.backgroundColor ?? "#ffffff"}
                      onChange={(e) => patchSettings({ backgroundColor: e.target.value })}
                      className="h-9 w-9 cursor-pointer rounded border border-input bg-background"
                    />
                    <Input
                      value={s.backgroundColor ?? ""}
                      placeholder="transparent"
                      onChange={(e) => patchSettings({ backgroundColor: e.target.value })}
                      className="font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Style</Label>
                <ToggleGroup
                  type="multiple"
                  value={[
                    s.fontWeight === "bold" ? "bold" : "",
                    s.fontStyle === "italic" ? "italic" : "",
                    s.textDecoration === "underline" ? "underline" : "",
                  ].filter(Boolean)}
                  onValueChange={(vals) => {
                    patchSettings({
                      fontWeight: vals.includes("bold") ? "bold" : "normal",
                      fontStyle: vals.includes("italic") ? "italic" : "normal",
                      textDecoration: vals.includes("underline") ? "underline" : "none",
                    });
                  }}
                  className="justify-start"
                >
                  <ToggleGroupItem value="bold" aria-label="Bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
                  <ToggleGroupItem value="underline" aria-label="Underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Alignment</Label>
                <ToggleGroup
                  type="single"
                  value={s.textAlign ?? "left"}
                  onValueChange={(v) => v && patchSettings({ textAlign: v as FieldSettings["textAlign"] })}
                  className="justify-start"
                >
                  <ToggleGroupItem value="left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
                  <ToggleGroupItem value="center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
                  <ToggleGroupItem value="right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Letter spacing</Label>
                    <span className="text-xs text-muted-foreground">{s.letterSpacing ?? 0}</span>
                  </div>
                  <Slider
                    min={-2} max={20} step={0.5}
                    value={[s.letterSpacing ?? 0]}
                    onValueChange={([v]) => patchSettings({ letterSpacing: v })}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Line height</Label>
                    <span className="text-xs text-muted-foreground">{(s.lineHeight ?? 1.2).toFixed(1)}</span>
                  </div>
                  <Slider
                    min={0.8} max={3} step={0.1}
                    value={[s.lineHeight ?? 1.2]}
                    onValueChange={([v]) => patchSettings({ lineHeight: v })}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Opacity</Label>
                    <span className="text-xs text-muted-foreground">{s.opacity ?? 100}%</span>
                  </div>
                  <Slider
                    min={0} max={100} step={1}
                    value={[s.opacity ?? 100]}
                    onValueChange={([v]) => patchSettings({ opacity: v })}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Rotation</Label>
                    <span className="text-xs text-muted-foreground">{s.rotation ?? 0}°</span>
                  </div>
                  <Slider
                    min={-180} max={180} step={1}
                    value={[s.rotation ?? 0]}
                    onValueChange={([v]) => patchSettings({ rotation: v })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Radius</Label>
                  <Input
                    type="number"
                    value={s.borderRadius ?? 0}
                    onChange={(e) => patchSettings({ borderRadius: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Padding</Label>
                  <Input
                    type="number"
                    value={s.padding ?? 4}
                    onChange={(e) => patchSettings({ padding: Number(e.target.value) })}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs">Width</Label>
                  <Input
                    type="number"
                    value={current.width}
                    onChange={(e) => updateField(current.id, { width: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Height</Label>
                  <Input
                    type="number"
                    value={current.height}
                    onChange={(e) => updateField(current.id, { height: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
