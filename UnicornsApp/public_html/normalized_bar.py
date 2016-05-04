
with open("maptime.csv", "r") as ins:
	target = open('percent_data.csv', 'w')
	
	for line in ins:
		array = []
		events = line.split(',')
# for each investor co, for each coCountry, add them up

		inverstorCo = events[4]
		companyCo = events[1]
		amount = events[8]

		array.append(inverstorCo+"-"+companyCo+":"+amount)


		for line in array:
			

			target.write(line)



		# obj[4] investor country
		# obj[1] compary country
		# obj[8] amount
		# array.append(line)