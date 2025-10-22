"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "@/components/filter-bar";
import { PresetCard } from "@/components/preset-card";
import { presetFilters, presets } from "@/data/presets";

export function PresetLineup() {
  const [selected, setSelected] = useState<string>(presetFilters[0]);

  const visiblePresets = useMemo(() => {
    if (selected === "전체") return presets;
    return presets.filter((preset) =>
      preset.sceneTags.some((tag) => tag.toLowerCase() === selected.toLowerCase()),
    );
  }, [selected]);

  return (
    <div className="space-y-10">
      <FilterBar
        options={presetFilters}
        value={selected}
        onChange={setSelected}
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visiblePresets.map((preset) => (
          <PresetCard key={preset.id} preset={preset} />
        ))}
      </div>
    </div>
  );
}
