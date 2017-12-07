package com.app.alex.testapp;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Delete;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;
import android.arch.persistence.room.Update;

import java.util.List;

/**
 * Created by Alex on 12/19/2017.
 */

@Dao
public interface GoalDao {
    @Query("SELECT * FROM goal")
    List<Goal> selectAll();

    @Insert
    void add(Goal goal);

    @Update
    void update(Goal goal);

    @Delete
    void delete(Goal goal);
}
