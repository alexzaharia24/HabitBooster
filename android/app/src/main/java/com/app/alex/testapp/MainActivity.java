package com.app.alex.testapp;

import android.arch.persistence.room.Room;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MainActivity extends AppCompatActivity {

//    public static final String EXTRA_MESSAGE = "com.example.app.MESSAGE";

    public static List<Goal> goals;
    public static List<Goal> goals_completed;
    public static AppDatabase db;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        goals = new ArrayList<>();
        goals_completed = new ArrayList<>();
    }

    @Override
    protected void onResume() {
        super.onResume();
        fetchData();
    }

    public void fetchData() {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(new Runnable() {
                             @Override
                             public void run() {
                                 db = Room.databaseBuilder(getApplicationContext(), AppDatabase.class, "habit_booster_db").build();

                                 goals = db.goalDao().selectAll();
                                 goals_completed = filterCompletedGoals(MainActivity.db.goalDao().selectAll());

                                 Log.d("DB", "DB goals: " + goals.size());
                                 for(int i=0; i<goals.size(); i++) {
                                     Goal g = goals.get(i);
                                     Log.d("DB", "Goal: " + g.getId() + " " + g.getTitle() + " " + g.getCategory() + " "+  g.getStartDate() + " " + g.getEndDate() + " " + g.getCompleted());
                                 }

                                 Log.d("DB", "DB goals_completed: " + goals_completed.size());
                                 for(int i=0; i<goals_completed.size(); i++) {
                                     Goal g = goals_completed.get(i);
                                     Log.d("DB", "Goal: " + g.getId() + " " + g.getTitle() + " " + g.getCategory() + " "+  g.getStartDate() + " " + g.getEndDate() + " " + g.getCompleted());
                                 }
                             }
                         }
        );
    }


    public void goToViewGoals(View view) {
        Intent intent = new Intent(this, ViewGoalsActivity.class);
        startActivity(intent);
    }

    public void goToCompletedGoals(View view) {
        Intent intent = new Intent(this, Completed_goals.class);
        startActivity(intent);
    }

    public void goToAddGoal(View view) {
        Intent intent = new Intent(this, AddGoal.class);
        startActivity(intent);
    }

    public void goToSignUp(View view) {
        Intent intent = new Intent(this, SignUpActivity.class);
        startActivity(intent);
    }

    public void goToStats(View view) {
        Intent intent = new Intent(this, Stats.class);
        startActivity(intent);
    }

    private List<Goal> filterCompletedGoals(List<Goal> goals) {
        List<Goal> result = new ArrayList<>();
        for(int i=0; i<goals.size(); i++) {
            if(goals.get(i).getCompleted()) {
                result.add(goals.get(i));
            }
        }

        return result;
    }
}
