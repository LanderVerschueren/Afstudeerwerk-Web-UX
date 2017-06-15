<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
	<h1>Uw bestelling bij {{ $shop['name'] }}</h1>
	<p>Je bestelling kan afgehaald worden vanaf {{ $details['date_pickup'] }}, in de 
		<?php if($details['period_pickup'] == 'am' ) : ?>
    		<strong>voormiddag</strong>.
    	<?php else : ?>
			<strong>namiddag</strong>.
		<?php endif; ?></p>
	<h3>Je bestelling:</h3>
	<?php foreach ($details['products'] as $key => $value) : ?>
		
	<?php endforeach; ?>
</body>
</html>
