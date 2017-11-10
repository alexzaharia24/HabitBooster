package com.app.alex.testapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

//    public static final String EXTRA_MESSAGE = "com.example.app.MESSAGE";

    public static List<Goal> goals;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        goals = new ArrayList<>();
        goals.add(new Goal(1, "Run 5 miles daily", "07/09/2017", "07/12/2017"));
        goals.add(new Goal(2, "Read 2 books a month", "10/09/2017", "05/11/2017"));
        goals.add(new Goal(3, "Swim once a week", "20/09/2017", "04/12/2017"));
        goals.add(new Goal(4, "Wake up at 06:00", "01/10/2017", "01/11/2017"));
    }

    public void goToViewGoals(View view) {
        Intent intent = new Intent(this, ViewGoalsActivity.class);
        startActivity(intent);
    }

    public void goToSignUp(View view) {
        Intent intent = new Intent(this, SignUpActivity.class);
        startActivity(intent);
    }
}
