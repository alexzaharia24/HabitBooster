package com.app.alex.testapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class GoalDetailsActivity extends AppCompatActivity {

    private EditText inputId;
    private EditText inputTitle;
    private EditText inputStartDate;
    private EditText inputEndDate;
    private int position;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_goal_details);

        int id;
        String title, startDate, endDate;

        Intent intent = getIntent();
        position = intent.getIntExtra("position", -1);
        id = intent.getIntExtra("id", 0);
        title = intent.getStringExtra("title");
        startDate = intent.getStringExtra("startDate");
        endDate = intent.getStringExtra("endDate");

        inputId = (EditText) findViewById(R.id.inputGoalId);
        inputTitle = (EditText) findViewById(R.id.inputGoalTitle);
        inputStartDate = (EditText) findViewById(R.id.inputGoalStart);
        inputEndDate = (EditText) findViewById(R.id.inputGoalEnd);

        inputId.setText(String.valueOf(id));
        inputTitle.setText(title);
        inputStartDate.setText(startDate);
        inputEndDate.setText(endDate);
    }

    public void saveGoal(View view) {
        int id = Integer.parseInt(inputId.getText().toString());
        String title = inputTitle.getText().toString();
        String startDate = inputStartDate.getText().toString();
        String endDate = inputEndDate.getText().toString();

        MainActivity.goals.get(position).setId(id);
        MainActivity.goals.get(position).setTitle(title);
        MainActivity.goals.get(position).setStartDate(startDate);
        MainActivity.goals.get(position).setEndDate(endDate);

        ViewGoalsActivity.adapter.notifyDataSetChanged();
        finish();
    }
}
