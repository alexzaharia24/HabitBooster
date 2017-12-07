package com.app.alex.testapp;

import android.arch.persistence.room.ColumnInfo;
import android.arch.persistence.room.Entity;
import android.arch.persistence.room.Ignore;
import android.arch.persistence.room.PrimaryKey;

/**
 * Created by Alex on 11/10/2017.
 */

@Entity
public class Goal {
    @PrimaryKey
    private int id;
    @ColumnInfo(name = "title")
    private String title;
    @ColumnInfo(name = "category")
    private String category;
    @ColumnInfo(name = "startDate")
    private String startDate;
    @ColumnInfo(name = "endDate")
    private String endDate;
    @ColumnInfo(name = "isCompleted")
    private Boolean isCompleted;

    @Ignore
    public Goal(String title, String category, String startDate, String endDate) {
        this.title = title;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isCompleted = false;
    }

    @Ignore
    public Goal(String title, String category, String startDate, String endDate, Boolean isCompleted) {
        this.title = title;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isCompleted = isCompleted;
    }

    public Goal(int id, String title, String category, String startDate, String endDate) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isCompleted = false;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return "[" + id + "] " + title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Boolean getCompleted() {
        return isCompleted;
    }

    public void setCompleted(Boolean completed) {
        isCompleted = completed;
    }
}
