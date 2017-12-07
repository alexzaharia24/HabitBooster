package com.app.alex.testapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import java.util.Calendar;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.widget.DatePicker;
import android.widget.TextView;
import android.widget.Toast;

public class AddGoal extends AppCompatActivity {

    private EditText inputTitle;
    private EditText inputCategory;
    private EditText inputStartDate;
    private EditText inputEndDate;
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
        setContentView(R.layout.activity_add_goal);

        inputTitle = (EditText) findViewById(R.id.inputGoalTitle);
        inputCategory = (EditText) findViewById(R.id.inputGoalCategory);
        inputStartDate = (EditText) findViewById(R.id.inputGoalStart);
        inputEndDate = (EditText) findViewById(R.id.inputGoalEnd);

        calendar = Calendar.getInstance();
        year = calendar.get(Calendar.YEAR);
        month = calendar.get(Calendar.MONTH);
        day = calendar.get(Calendar.DAY_OF_MONTH);

        startDatePickerDialog = new DatePickerDialog(this, startDateListener, year, month, day);
        endDatePickerDialog = new DatePickerDialog(this, endDateListener, year, month, day);
    }

    public void saveGoal(View view) {
        int id = MainActivity.goals.get(MainActivity.goals.size() - 1).getId() + 1;
        String title = inputTitle.getText().toString();
        String category = inputCategory.getText().toString();
        String startDate = inputStartDate.getText().toString();
        String endDate = inputEndDate.getText().toString();


        final Goal goal = new Goal(id, title, category, startDate, endDate);
        Log.d("Add goal", "New goal id: " + id);

        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(new Runnable() {
                             @Override
                             public void run() {
                                 MainActivity.db.goalDao().add(goal);
                             }
                         }
        );

//        MainActivity.goals.add(goal);
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
}
