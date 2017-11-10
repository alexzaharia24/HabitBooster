package com.app.alex.testapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ViewGoalsActivity extends AppCompatActivity {

    public static List<Goal> goals;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_goals);
//        String goals[] = new String[] {"Goal 1" , "Goal 2", "Goal 3"};

        goals = new ArrayList<>();
        goals.add(new Goal(1, "Run 5 miles daily", "07/09/2017", "07/12/2017"));
        goals.add(new Goal(2, "Read 2 books a month", "10/09/2017", "05/11/2017"));
        goals.add(new Goal(3, "Swim once a week", "20/09/2017", "04/12/2017"));
        goals.add(new Goal(4, "Wake up at 06:00", "01/10/2017", "01/11/2017"));

        ListView listView = (ListView) findViewById(R.id.goals);
        ArrayAdapter<Goal> adapter = new ArrayAdapter<>(this, R.layout.goal_item, goals);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(viewGoalDetails);

    }

    private AdapterView.OnItemClickListener viewGoalDetails = new AdapterView.OnItemClickListener() {
        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            Log.d("Goal item clickk", "Goal clicked.");
            Goal goal = goals.get(position);
            Intent intent = new Intent(ViewGoalsActivity.this, GoalDetailsActivity.class);
            intent.putExtra("position", position);
            intent.putExtra("id", goal.getId());
            intent.putExtra("title", goal.getTitle());
            intent.putExtra("startDate", goal.getStartDate());
            intent.putExtra("endDate", goal.getEndDate());

            startActivity(intent);
        }
    };
}
