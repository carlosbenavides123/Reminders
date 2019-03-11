<template>
	<StackLayout backgroundColor="#3c495e">
		<card-view margin="10" elevation="90">
			<stack-layout>
				<label text="Jot a task down!" />
				<TextField  v-model="reminder" class="input" hint="New Reminder"></TextField>
				<TimePicker v-model="selectedTime" />
				<DatePicker v-model="selectedDate" />
				<Button 
					text='submit'
					class="btn-login"
					@tap=remind()
				>
        	</Button>

			    <StackLayout>
				<Button @tap="onTapHasPermission" class="btn" text="Has Permission?"></Button>
				<Button @tap="onTapCancelAll" class="btn" text="Cancel notifications"></Button>
				<Label class="message" :text="message" textWrap="true"></Label>
				</StackLayout>
			</stack-layout>
		</card-view>
   </StackLayout>
</template>

<script>
import { alert } from "tns-core-modules/ui/dialogs";
import { Color } from "tns-core-modules/color";
import { LocalNotifications } from "nativescript-local-notifications";

var offset = new Date();
var hour = offset.getHours();
var min = offset.getMinutes();

var month = offset.getMonth() + 1;
var day = offset.getDate();
var id = 1;
var arr = [];

export default {
	created() {
      LocalNotifications.addOnMessageReceivedCallback(notificationData => {
        this.message = "Notification received: " + JSON.stringify(notificationData);
      });
    },
	data(){
		return {
			reminder: null,
			selectedTime: offset,
			selectedDate: offset,
			selectedHour: hour,
			selectedMinute: min,
			selectedMonth: month,
			selectedDay: day,
			selectedTimeToDisplayAt:null,
		}
	},
	methods:{
		onTapHasPermission() {
			LocalNotifications.hasPermission()
				.then(granted => {
				alert({
					title: "Permission granted?",
					message: granted ? "YES" : "NO",
					okButtonText: "OK"
				});
				});
		},
				remind(){
			console.log("yeess")
			let nowHour = this.selectedTime.getHours();
			let nowMinute = this.selectedTime.getMinutes();
			this.selectedHour = nowHour;
			this.selectedMinute = nowMinute;

			let nowDay = this.selectedDate.getDate();
			let nowMonth = this.selectedDate.getMonth();
			this.selectedMonth = nowMonth;
			this.selectedDay = nowDay;

			var d = new Date(2019, nowMonth, nowDay,  nowHour, nowMinute);
			console.log(d);
			console.log(nowMinute);
			id+=1;

			var input = 	[
					{
						id: id,
						title: 'Reminder',
						body: this.reminder,
						bigTextStyle: false,
						color: new Color("Green"),
						forceShowWhenInForeground: true,
						channel: "vue-channel",
						ticker: "Special ticker text for Vue (Android only)",
						at: d, 
						actions: [
							{
							id: "ok",
							type: "button",
							},
						]
					}
				]

			LocalNotifications.schedule(
				input
			).then(() => {
				alert({
					title: "Notification scheduled",
					message: "ID: " +id,
					okButtonText: "OK, thanks"
				});
			}).catch(error => console.log("doSchedule error: " + error));

		},
      onTapCancelAll() {
        LocalNotifications.cancelAll()
            .then(() => {
              alert({
                title: "All canceled",
                okButtonText: "Awesome!"
              });
            })
            .catch(error => console.log("doCancelAll error: " + error));
      }
	}
}
</script>

<style lang="scss">
.btn-login{
    background-color: #e60023;
    color: white;
}
</style>
