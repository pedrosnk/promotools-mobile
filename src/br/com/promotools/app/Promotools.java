/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package br.com.promotools.app;

import org.apache.cordova.Config;
import org.apache.cordova.DroidGap;

import android.content.ContentResolver;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class Promotools extends DroidGap
{
	private static ContentResolver applicationContentResolver;
	private static Promotools instance;
	
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.loadUrl(Config.getStartUrl());
        Promotools.setApplicationContentResolver(getContentResolver());
        instance = this;
        /**
         * Uncoment the line bellow to run the tests spec
         */

//        super.loadUrl("file:///android_asset/www/spec.html"); // to run tests
//        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION);
    }



	public static ContentResolver getApplicationContentResolver() {
		return applicationContentResolver;
	}

	public static void setApplicationContentResolver(
			ContentResolver applicationContentResolver) {
		Promotools.applicationContentResolver = applicationContentResolver;
	}
	
	public static void executeIntent(Intent intent){
		instance.startActivity(intent);
	}
	
}

