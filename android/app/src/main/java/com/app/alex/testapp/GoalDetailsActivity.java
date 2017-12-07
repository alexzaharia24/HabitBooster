package com.app.alex.testapp;

import android.app.DatePickerDialog;
import android.arch.persistence.room.Room;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.DatePicker;
import android.widget.EditText;

import java.util.Calendar;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class GoalDetailsActivity extends AppCompatActivity {

    private EditText inputId;
    private EditText inputTitle;
    private EditText inputCategory;
    private EditText inputStartDate;
    private EditText inputEndDate;
    private int position;
    private int id;

    private DatePickerDialog startDatePickerDialog;
    private DatePickerDialog endDatePickerDialog;
    private Calendar calendar;
    private int year, month, day;

    private DatePickerDialog.OnDateSetListener startDateListener = new
            DatePickerDialog.OnDateSetListener() {
                @Override
                public void onDateSet(DatePicker arg0,
                                      int arg1, int arg2, int arg3) {
                    showStartDate(arg1, arg2 + 1, arg3);
                }
            };

    private DatePickerDialog.OnDateSetListener endDateListener = new
            DatePickerDialog.OnDateSetListener() {
                @Override
                public void onDateSet(DatePicker arg0,
                                      int arg1, int arg2, int arg3) {
                    showEndDate(arg1, arg2 + 1, arg3);
                }
            };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_goal_details);

        String title, category, startDate, endDate;

        Intent intent = getIntent();
        position = intent.getIntExtra("position", -1);
        id = intent.getIntExtra("id", 0);
        title = intent.getStringExtra("title");
        category = intent.getStringExtra("category");
        startDate = intent.getStringExtra("startDate");
        endDate = intent.getStringExtra("endDate");

        inputId = (EditText) findViewById(R.id.inputGoalId);
        inputTitle = (EditText) findViewById(R.id.inputGoalTitle);
        inputCategory = (EditText) findViewById(R.id.inputGoalCategory);
        inputStartDate = (EditText) findViewById(R.id.inputGoalStart);
        inputEndDate = (EditText) findViewById(R.id.inputGoalEnd);

        inputId.setText(String.valueOf(id));
        inputTitle.setText(title);
        inputCategory.setText(category);
        inputStartDate.setText(startDate);
        inputEndDate.setText(endDate);

        calendar = Calendar.getInstance();
        year = calendar.get(Calendar.YEAR);
        month = calendar.get(Calendar.MONTH);
        day = calendar.get(Calendar.DAY_OF_MONTH);

        startDatePickerDialog = new DatePickerDialog(this, startDateListener, year, month, day);
        endDatePickerDialog = new DatePickerDialog(this, endDateListener, year, month, day);
    }

    public void saveGoal(View view) {
        int id = Integer.parseInt(inputId.getText().toString());
        String title = inputTitle.getText().toString();
        String category = inputCategory.getText().toString();
        String startDate = inputStartDate.getText().toString();
        String endDate = inputEndDate.getText().toString();

        final Goal goal = new Goal(id, title, category, startDate, endDate);

        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(new Runnable() {
                             @Override
                             public void run() {
                                 MainActivity.db.goalDao().update(goal);
                             }
                         }
        );

        ViewGoalsActivity.adapter.notifyDataSetChanged();
        finish();
    }

    public void completeGoal(View view) {
        final Goal goal = findById(id);
//        MainActivity.goals_completed.add(goal);
//        MainActivity.goals.get(position).setCompleted(true);
        goal.setCompleted(true);
        Log.d("Detail", "New goal completion: " + goal.getId());
//        MainActivity.goals.remove(position);

        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(new Runnable() {
                             @Override
                             public void run() {
                                 MainActivity.db.goalDao().update(goal);

                                 List<Goal> goals = MainActivity.db.goalDao().selectAll();

                                 Log.d("DB", "Details DB goals: " + goals.size());
                                 for(int i=0; i<goals.size(); i++) {
                                     Goal g = goals.get(i);
                                     Log.d("DB", "Goal: " + g.getId() + " " + g.getTitle() + " " + g.getCategory() + " "+  g.getStartDate() + " " + g.getEndDate() + " " + g.getCompleted());
                                 }

                             }
                         }
        );

        ViewGoalsActivity.adapter.notifyDataSetChanged();
        finish();
    }

    public void deleteGoal(View view) {

        ExecutorService executor = Executors.newSingleThreadExecutor();
        final Goal goal = findById(id);
        executor.execute(new Runnable() {
                             @Override
                             public void run() {
                                 MainActivity.db.goalDao().delete(goal);
                             }
                         }
        );

        ViewGoalsActivity.adapter.notifyDataSetChanged();
        finish();
    }

    public void showStartDate(int year, int month, int day) {
        inputStartDate.setText(day + "/" + month + "/" + year);
    }

    public void showEndDate(int year, int month, int day) {
        inputEndDate.setText(day + "/" + month + "/" + year);
    }

    public void setStartDate(View view) {
        startDatePickerDialog.show();
    }

    public void setEndDate(View view) {
        endDatePickerDialog.show();
    }

    private Goal findById(int id) {
        for(int i=0; i<MainActivity.goals.size(); i++) {
            Goal g = MainActivity.goals.get(i);
            if(g.getId() == id) {
                return g;
            }
        }
        return null;
    }
}
