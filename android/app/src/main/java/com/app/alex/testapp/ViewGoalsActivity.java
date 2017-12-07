package com.app.alex.testapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ViewGoalsActivity extends AppCompatActivity {

    public static ArrayAdapter<Goal> adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_goals);

        ListView listView = (ListView) findViewById(R.id.goals);
        adapter = new ArrayAdapter<>(this, R.layout.goal_item, filterUncompletedGoals(MainActivity.goals));
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
            String data = (String) ((TextView) view).getText();
            int tokenIndex = data.indexOf("]");
            int item_id = Integer.valueOf(data.substring(1, tokenIndex));

            Log.d("Goal item clickk", "Goal clicked: " + item_id);
            Goal goal = findById(item_id);
            if(goal != null) {
                Intent intent = new Intent(ViewGoalsActivity.this, GoalDetailsActivity.class);
                intent.putExtra("position", position);
                intent.putExtra("id", goal.getId());
                intent.putExtra("title", goal.getTitle());
                intent.putExtra("category", goal.getCategory());
                intent.putExtra("startDate", goal.getStartDate());
                intent.putExtra("endDate", goal.getEndDate());

                startActivityForResult(intent, 100);
            }
        }
    };

    private List<Goal> filterUncompletedGoals(List<Goal> goals) {
        List<Goal> result = new ArrayList<>();
        for(int i=0; i<goals.size(); i++) {
            if(!goals.get(i).getCompleted()) {
                result.add(goals.get(i));
            }
        }

        return result;
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
