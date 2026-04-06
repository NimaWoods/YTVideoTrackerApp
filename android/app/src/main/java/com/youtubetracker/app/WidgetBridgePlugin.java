package com.youtubetracker.app;

import android.content.Context;
import android.content.SharedPreferences;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;

@CapacitorPlugin(name = "WidgetBridge")
public class WidgetBridgePlugin extends Plugin {

    private static final String PREFS_NAME = "YouTubeTrackerPrefs";

    @PluginMethod
    public void updateWidgetData(PluginCall call) {
        String videoTitle = call.getString("videoTitle", "Kein Video");
        long viewCount = call.getLong("viewCount", 0L);
        String lastUpdate = call.getString("lastUpdate", "Nie aktualisiert");

        // Save to SharedPreferences
        Context context = getContext();
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString("video_title", videoTitle);
        editor.putLong("view_count", viewCount);
        editor.putString("last_update", lastUpdate);
        editor.commit();

        // Trigger widget update
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        ComponentName thisWidget = new ComponentName(context, YouTubeWidgetProvider.class);
        int[] appWidgetIds = appWidgetManager.getAppWidgetIds(thisWidget);
        
        if (appWidgetIds.length > 0) {
            // Create intent to update widget
            android.content.Intent intent = new android.content.Intent(context, YouTubeWidgetProvider.class);
            intent.setAction("com.youtubetracker.app.REFRESH_WIDGET");
            context.sendBroadcast(intent);
        }

        JSObject ret = new JSObject();
        ret.put("success", true);
        call.resolve(ret);
    }

    @PluginMethod
    public void getWidgetData(PluginCall call) {
        Context context = getContext();
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        
        JSObject ret = new JSObject();
        ret.put("videoTitle", prefs.getString("video_title", "Kein Video"));
        ret.put("viewCount", prefs.getLong("view_count", 0));
        ret.put("lastUpdate", prefs.getString("last_update", "Nie aktualisiert"));
        call.resolve(ret);
    }
}
