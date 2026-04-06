import { registerPlugin } from '@capacitor/core';

export interface WidgetData {
  videoTitle: string;
  viewCount: number;
  lastUpdate: string;
}

export interface WidgetBridgePlugin {
  updateWidgetData(data: WidgetData): Promise<{ success: boolean }>;
  getWidgetData(): Promise<WidgetData>;
}

const WidgetBridge = registerPlugin<WidgetBridgePlugin>('WidgetBridge');

export default WidgetBridge;
