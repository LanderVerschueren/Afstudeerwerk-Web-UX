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
	<?php foreach( json_decode( $products ) as $product ) : ?>
		<div>
			<h4>Info:</h4>				
			<div>
				<p>Product: {{ $product->product_name }}</p>
			</div>
			<div>
				<p>Hoeveelheid: {{ $product->amount }} g</p>
			</div>
			<div>
				<p>Prijs: € {{ $product->total_price }}</p>
			</div>
		</div>
	<?php endforeach; ?>
</body>
</html>
