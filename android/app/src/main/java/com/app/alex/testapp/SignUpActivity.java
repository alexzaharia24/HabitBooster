package com.app.alex.testapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class SignUpActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
    }

    public void sendMail(View view) {
        EditText inputEmail = (EditText) findViewById(R.id.inputEmail);
        EditText inputPassword = (EditText) findViewById(R.id.inputPassword);

        String email = inputEmail.getText().toString();
        String password = inputEmail.getText().toString();
        String subject = "HabitBooster confirmation";
        String body = "This is a confirmation email.";

        String[] emails = {email};

        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.putExtra(Intent.EXTRA_EMAIL, emails);
        intent.putExtra(Intent.EXTRA_SUBJECT, subject);
        intent.putExtra(Intent.EXTRA_TEXT, body);
        intent.setType("message/rfc822");

        startActivity(Intent.createChooser(intent, "Choose an Email client :"));
    }

}
