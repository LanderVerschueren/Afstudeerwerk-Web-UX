<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
	<h1>Je hebt een nieuwe bestelling!</h1>
	<h3>Gegevens van de besteller: </h3>
	<p>{{ $details['name'] }}</p>
	<p>{{ $details['email'] }}</p>
	<p>{{ $details['phonenumber'] }}</p>
	<p>De bestelling kan afgehaald worden vanaf {{ $details['date_pickup'] }}, in de 
		<?php if($details['period_pickup'] == 'am' ) : ?>
    		<strong>voormiddag</strong>.
    	<?php else : ?>
			<strong>namiddag</strong>.
		<?php endif; ?></p>
	<h3>De bestelling:</h3>
	<?php foreach ($details as $key => $value) : ?>
		
	<?php endforeach; ?>
</body>
</html>
