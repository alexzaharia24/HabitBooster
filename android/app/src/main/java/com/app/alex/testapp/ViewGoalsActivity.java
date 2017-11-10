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

    public static ArrayAdapter<Goal> adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_goals);
//        String goals[] = new String[] {"Goal 1" , "Goal 2", "Goal 3"};



        ListView listView = (ListView) findViewById(R.id.goals);
        adapter = new ArrayAdapter<>(this, R.layout.goal_item, MainActivity.goals);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(viewGoalDetails);

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
//        if (requestCode == 100) {
//            adapter.notifyDataSetChanged();

//            Intent intent = getIntent();
//            finish();
//            intent.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
//            startActivity(intent);
//        }
    }

    private AdapterView.OnItemClickListener viewGoalDetails = new AdapterView.OnItemClickListener() {
        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            Log.d("Goal item clickk", "Goal clicked.");
            Goal goal = MainActivity.goals.get(position);
            Intent intent = new Intent(ViewGoalsActivity.this, GoalDetailsActivity.class);
            intent.putExtra("position", position);
            intent.putExtra("id", goal.getId());
            intent.putExtra("title", goal.getTitle());
            intent.putExtra("startDate", goal.getStartDate());
            intent.putExtra("endDate", goal.getEndDate());

            startActivityForResult(intent, 100);
        }
    };
}
