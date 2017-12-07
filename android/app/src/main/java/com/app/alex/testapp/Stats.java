package com.app.alex.testapp;

import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.components.Description;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class Stats extends AppCompatActivity {

    private ArrayList<String> xData;
    private ArrayList<Integer> yData;
    PieChart pieChart;
    Map<String, Integer> countPerCategroy;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_stats);

        pieChart = (PieChart) findViewById(R.id.pieChart);
        pieChart.setHoleRadius(0);


        countPerCategroy = new HashMap<>();
        xData = new ArrayList<>();
        yData = new ArrayList<>();

        for (int i = 0; i < MainActivity.goals.size(); i++) {
            Goal goal = MainActivity.goals.get(i);
            if (!goal.getCompleted()) {

                Integer count = countPerCategroy.get(goal.getCategory());
                if (count == null) {
                    count = 0;
                }
                count += 1;
                countPerCategroy.put(goal.getCategory(), count);
            }
        }

        addDataSet(pieChart);

    }

    private void addDataSet(PieChart pieChart) {
        Set<String> keys = countPerCategroy.keySet();
        for (String k : keys) {
            xData.add(k);
        }

        for (int i = 0; i < xData.size(); i++) {
            yData.add(countPerCategroy.get(xData.get(i)));
        }

        ArrayList<String> xEntries = new ArrayList<>();
        ArrayList<PieEntry> yEntries = new ArrayList<>();

        for (int i = 0; i < yData.size(); i++) {
            yEntries.add(new PieEntry(yData.get(i), xData.get(i)));
        }

        for (int i = 0; i < xData.size(); i++) {
            xEntries.add(xData.get(i));
        }


        PieDataSet pieDataSet = new PieDataSet(yEntries, "Active goals ratio per category");
        pieDataSet.setValueTextSize(12);

        ArrayList<Integer> colors = new ArrayList<>();
        colors.add(Color.RED);
        colors.add(Color.GRAY);
        colors.add(Color.BLUE);
        colors.add(Color.GREEN);
        colors.add(Color.CYAN);

        pieDataSet.setColors(colors);

        PieData pieData = new PieData(pieDataSet);
        pieChart.setData(pieData);
    }
}
