package com.youtubetracker.app;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.RemoteViews;

public class YouTubeWidgetProvider extends AppWidgetProvider {

    private static final String PREFS_NAME = "YouTubeTrackerPrefs";
    private static final String ACTION_REFRESH = "com.youtubetracker.app.REFRESH_WIDGET";

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if (ACTION_REFRESH.equals(intent.getAction())) {
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            ComponentName thisWidget = new ComponentName(context, YouTubeWidgetProvider.class);
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(thisWidget);
            onUpdate(context, appWidgetManager, appWidgetIds);
        }
    }

    private void updateWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.youtube_widget);

        // Load data from SharedPreferences
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String videoTitle = prefs.getString("video_title", "Kein Video");
        long viewCount = prefs.getLong("view_count", 0);
        String lastUpdate = prefs.getString("last_update", "Nie aktualisiert");

        // Update views
        views.setTextViewText(R.id.video_title, videoTitle.length() > 30 ? videoTitle.substring(0, 30) + "..." : videoTitle);
        views.setTextViewText(R.id.video_views, formatNumber(viewCount) + " Views");
        views.setTextViewText(R.id.last_update, lastUpdate);

        // Set up refresh button
        Intent refreshIntent = new Intent(context, YouTubeWidgetProvider.class);
        refreshIntent.setAction(ACTION_REFRESH);
        PendingIntent refreshPendingIntent = PendingIntent.getBroadcast(context, 0, refreshIntent, 
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.refresh_button, refreshPendingIntent);

        // Set up click to open app
        Intent openAppIntent = new Intent(context, MainActivity.class);
        PendingIntent openAppPendingIntent = PendingIntent.getActivity(context, 0, openAppIntent, 
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.video_container, openAppPendingIntent);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    private String formatNumber(long number) {
        if (number >= 1000000) {
            return String.format("%.1fM", number / 1000000.0);
        } else if (number >= 1000) {
            return String.format("%.1fK", number / 1000.0);
        }
        return String.valueOf(number);
    }
}
