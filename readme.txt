The following describes the Radian6 XML data that exists in this directory
==========================================================================

coke_v_pepsi_trends.xml

This file contains Radian6 Topic Trends data for Coke Zero v Pepsi Max for the 14 day period 10/18/2011 thru 10/31/2011.
It is for all media types. It's is extracted from the corresponding widget using /data/widget/1591287712
This data should be available dynamically thru other API calls, 
e.g. 
/data/timeseriesdata/{daterangeStart}/{daterangeEnd}/{topics}/{mediatypes}/{segmentation}
/data/timeseriesdata/1318906800000/1320030000000/296954/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16/0
/data/timeseriesdata/{recentXhours}/{topics}/{mediatypes}/{segmentation}
/data/timeseriesdata/336/296954/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16/0


coke_timeseries_range.xml

Timeseries data for Coke Zero only for dates 10/18/2011 thru 10/31/2011 for all media types. Here's the REST url
/data/timeseriesdata/1318906800000/1320030000000/296954/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16/0

coke_trends.xml

As above except no pepsi data

coke_twitter_trends.xml

As above but for Coke Zero only and Twitter only

coke_facebook_trends.xml

As above but for Coke Zero only and Facebook only

coke_v_pepsi_analysis.xml

Contains topic Analysis data for Coke Zero v Pepsi Max for the 14 day period 10/18/2011 thru 10/31/2011.
It is for all media types. It's is extracted from the corresponding widget using /data/widget/1591287897
This data should be available dynamically thru other API calls.
e.g
/data/comparisondata/{recentXhours}/{topics}/{mediatypes}/{segmentation}/{countBy}
/data/comparisondata/1318906800000/1320030000000/296954/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16/0/0

coke_facebook_river.xml

Contains River of News for Coke zero for 10/18/2011 thru 10/31/2011 for Facebook posts only



