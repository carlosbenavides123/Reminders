<template>
    <GridLayout rows="*, auto">
        <StackLayout row="0">
        </StackLayout>
        <BottomNavigation activeColor="white"
                        inactiveColor="#5c5c5c"
                        backgroundColor="#02203c"
                        keyLineColor="black"
                        @tabSelected="onBottomNavigationTabSelected"
                        row="1">
            <BottomNavigationTab title="" icon="ic_home" />
            <BottomNavigationTab title="" icon="ic_view_list" />
        </BottomNavigation>
    </GridLayout>
</template>

