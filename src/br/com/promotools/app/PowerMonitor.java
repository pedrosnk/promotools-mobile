package br.com.promotools.app;

import android.app.admin.DevicePolicyManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;
import android.os.BatteryManager;

public class PowerMonitor extends BroadcastReceiver {

	@Override
    public void onReceive(Context context, Intent intent) { 
        int status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
        boolean isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING ||
                            status == BatteryManager.BATTERY_STATUS_FULL;
    
//        int chargePlug = intent.getIntExtra(BatteryManager.EXTRA_PLUGGED, -1);
//        boolean usbCharge = chargePlug == BatteryManager.BATTERY_PLUGGED_USB;
//        boolean acCharge = chargePlug == BatteryManager.BATTERY_PLUGGED_AC;
        
        if (isCharging) {
        	System.out.println("connected");
        } else {
        	System.out.println("disconnected");
        	Settings.System.putInt(Promotools.getApplicationContentResolver(), Settings.System.SCREEN_OFF_TIMEOUT,1);
        }
    }
	
}