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
