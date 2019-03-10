<template>
	<Page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
          <GridLayout columns="*,2" rows="*" backgroundColor="lightgray" >

        <ReminderCard />
        <BottomNav/>
          </GridLayout>

	</Page>
</template>
<script>

import BottomNav from "./components/BottomNav";
import ReminderCard from "./components/ReminderCard";

export default {
	components: {
        BottomNav,
        ReminderCard
	},
};
</script>

<style>
.navStatusBar{
	background-color: #C8EDE6;
}
.status-title {
	color: white;
	font-size: 18;
	margin-left: 15;
	margin-top: 8;
	horizontal-align: left;
	vertical-align: center;
}
</style>