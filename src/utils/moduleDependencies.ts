import { Module } from '@/types/onboarding';

/**
 * Gets all available modules based on selected modules and their dependencies
 */
export const getAvailableModules = (
  allModules: Module[], 
  selectedModules: string[], 
  selectedBusinessType?: string
): Module[] => {
  return allModules.filter(module => {
    // Filter by business type if specified
    if (selectedBusinessType && selectedBusinessType !== 'custom' && module.businessTypes && !module.businessTypes.includes(selectedBusinessType)) {
      return false;
    }

    // Always show required modules
    if (module.required) {
      return true;
    }

    // If module has dependencies, check if all are satisfied
    if (module.dependencies && module.dependencies.length > 0) {
      return module.dependencies.every(depId => selectedModules.includes(depId));
    }

    // Show modules without dependencies
    return true;
  });
};

/**
 * Gets modules that depend on a given module
 */
export const getDependentModules = (allModules: Module[], moduleId: string): Module[] => {
  return allModules.filter(module => 
    module.dependencies && module.dependencies.includes(moduleId)
  );
};

/**
 * Gets all dependencies for a module recursively
 */
export const getAllDependencies = (allModules: Module[], moduleId: string): string[] => {
  const module = allModules.find(m => m.id === moduleId);
  if (!module || !module.dependencies) {
    return [];
  }

  const dependencies: string[] = [];
  const visited = new Set<string>();

  const collectDependencies = (modId: string) => {
    if (visited.has(modId)) return;
    visited.add(modId);

    const mod = allModules.find(m => m.id === modId);
    if (mod && mod.dependencies) {
      mod.dependencies.forEach(depId => {
        if (!dependencies.includes(depId)) {
          dependencies.push(depId);
          collectDependencies(depId);
        }
      });
    }
  };

  collectDependencies(moduleId);
  return dependencies;
};

/**
 * Validates and auto-selects dependencies when a module is selected
 */
export const handleModuleSelection = (
  allModules: Module[],
  currentSelection: string[],
  moduleId: string,
  isSelecting: boolean
): { 
  newSelection: string[];
  autoAddedModules: string[];
  autoRemovedModules: string[];
  warningMessage?: string;
} => {
  const module = allModules.find(m => m.id === moduleId);
  
  if (!module) {
    return { 
      newSelection: currentSelection, 
      autoAddedModules: [], 
      autoRemovedModules: [] 
    };
  }

  // Don't allow toggling required modules
  if (module.required) {
    return { 
      newSelection: currentSelection, 
      autoAddedModules: [], 
      autoRemovedModules: [],
      warningMessage: 'Required modules cannot be disabled'
    };
  }

  if (isSelecting) {
    // Auto-select dependencies
    const dependencies = getAllDependencies(allModules, moduleId);
    const autoAddedModules = dependencies.filter(depId => !currentSelection.includes(depId));
    const newSelection = [...new Set([...currentSelection, moduleId, ...dependencies])];
    
    return {
      newSelection,
      autoAddedModules,
      autoRemovedModules: []
    };
  } else {
    // Check for dependent modules that would be affected
    const dependentModules = getDependentModules(allModules, moduleId);
    const selectedDependents = dependentModules.filter(dep => currentSelection.includes(dep.id));
    
    if (selectedDependents.length > 0) {
      // Auto-remove dependent modules
      const autoRemovedModules = selectedDependents.map(dep => dep.id);
      const newSelection = currentSelection.filter(id => 
        id !== moduleId && !autoRemovedModules.includes(id)
      );
      
      return {
        newSelection,
        autoAddedModules: [],
        autoRemovedModules: [moduleId, ...autoRemovedModules]
      };
    } else {
      // Simple removal
      return {
        newSelection: currentSelection.filter(id => id !== moduleId),
        autoAddedModules: [],
        autoRemovedModules: [moduleId]
      };
    }
  }
};

/**
 * Checks if a module is unavailable due to missing dependencies
 */
export const isModuleUnavailable = (
  module: Module,
  selectedModules: string[]
): boolean => {
  if (module.required) return false;
  if (!module.dependencies || module.dependencies.length === 0) return false;
  
  return !module.dependencies.every(depId => selectedModules.includes(depId));
};

/**
 * Gets a human-readable dependency message
 */
export const getDependencyMessage = (
  module: Module,
  allModules: Module[],
  isRTL: boolean
): string => {
  if (!module.dependencies || module.dependencies.length === 0) {
    return '';
  }

  const dependencyNames = module.dependencies.map(depId => {
    const depModule = allModules.find(m => m.id === depId);
    return depModule ? (isRTL ? depModule.nameAr : depModule.nameEn) : depId;
  });

  if (isRTL) {
    return `يتطلب: ${dependencyNames.join('، ')}`;
  } else {
    return `Requires: ${dependencyNames.join(', ')}`;
  }
};