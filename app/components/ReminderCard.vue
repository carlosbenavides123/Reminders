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
			</stack-layout>
		</card-view>
   </StackLayout>
</template>

<script>
var offset = new Date();
var hour = offset.getHours();
var min = offset.getMinutes();

var month = offset.getMonth() + 1;
var day = offset.getDate();

export default {
	data(){
		return {
			reminder: null,
			selectedTime: offset,
			selectedDate: offset,
			selectedHour: hour,
			selectedMinute: min,
			selectedMonth: month,
			selectedDay: day,
		}
	},
	methods:{
		remind(){
			let nowHour = this.selectedTime.getHours();
			let nowMinute = this.selectedTime.getMinutes();
			this.selectedHour = nowHour;
			this.selectedMinute = nowMinute;

			let nowDay = this.selectedDate.getDate();
			let nowMonth = this.selectedDate.getMonth();
			this.selectedMonth = nowMonth;
			this.selectedDay = nowDay;
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
