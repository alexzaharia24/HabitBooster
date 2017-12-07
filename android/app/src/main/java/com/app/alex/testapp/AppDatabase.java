package com.app.alex.testapp;

import android.arch.persistence.room.Database;
import android.arch.persistence.room.RoomDatabase;

/**
 * Created by Alex on 12/19/2017.
 */

@Database(entities = {Goal.class}, version = 1, exportSchema = false)
public abstract class AppDatabase extends RoomDatabase{
    public abstract GoalDao goalDao();
}
