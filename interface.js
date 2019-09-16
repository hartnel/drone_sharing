//Definition of canvas dimension


var defaultval = {
	lineWidth: '3',
	lineText: '5',
	compas: {
		textProperty: {
			font: '17px serif',
			textAlign: "center",
			fillStyle: 'RGBa(0, 0, 200,1)',
			textBaseline: 'middle',
		}
	}
}
var canvasWight = screen.availWidth * 99.8 / 100, canvasHeight = screen.availHeight * 80 / 100;

//var canvasWight=screen.availWidth*99.8/100, canvasHeight=screen.availHeight*94.5/100;
var canvas2 = document.getElementById("canvas2");
var canvas = document.getElementById("canvas1");
var ctx2 = canvas2.getContext("2d");
var ctx1 = canvas.getContext("2d");
canvas.width = canvasWight;
canvas.height = canvasHeight;
canvas2.width = canvasWight;
canvas2.height = canvasHeight;
ctx2.lineJoin = 'round';
ctx1.lineJoin = 'round';
function test() {
	ctx2.moveTo(0, 0);
	ctx2.lineTo(500, 500);
	ctx2.stroke();
}
// Definition of point objet
function Point(x, y) {
	this.x = x;
	this.y = y;
}

// Defintion of anemometer objet
function Anemometer(origine, rulerLength, maxHeight, nbrOfDivision, pas) {
	this.origine = origine;
	this.rulerLength = rulerLength;
	this.maxHeight = maxHeight;
	this.nbrOfDivision = nbrOfDivision;
	this.pas = pas;
	this.draw = function () {
		//drawing of ruler
		ctx1.beginPath();
		ctx1.strokeStyle = 'RGBa(0,0,150,0.1)';
		//vertical line of ruler
		ctx1.moveTo(this.origine.x, this.origine.y);
		ctx1.lineTo(this.origine.x + this.rulerLength, this.origine.y);
		ctx1.stroke();
		//make of graduation
		for (var i = 0; i <= this.nbrOfDivision; i++) {
			ctx1.moveTo(this.origine.x + this.rulerLength * i / (this.nbrOfDivision), this.origine.y);
			ctx1.lineTo(this.origine.x + this.rulerLength * i / (this.nbrOfDivision), this.origine.y - this.maxHeight);
			ctx1.stroke();
		}
		for (var i = 0; i <= this.nbrOfDivision - 1; i++) {
			ctx1.moveTo(this.origine.x + this.rulerLength * (i + 0.5) / (this.nbrOfDivision), this.origine.y);
			ctx1.lineTo(this.origine.x + this.rulerLength * (i + 0.5) / (this.nbrOfDivision), this.origine.y - this.maxHeight / 2);
			ctx1.stroke();
		}
	}
	this.setCriticalArea = function (minSpeed, maxSpeed) {
		//draw critical zone of fly
		ctx1.beginPath();
		var mSpeed = this.pas * this.nbrOfDivision;
		ctx1.fillStyle = 'RGBa(50,200,100,0.5)';
		ctx1.fillRect(this.origine.x + minSpeed * this.rulerLength / mSpeed, this.origine.y, (maxSpeed - minSpeed) * this.rulerLength / mSpeed, -this.maxHeight);
		ctx1.fillStyle = 'RGBa(255,50,50,0.5)';
		ctx1.fillRect(this.origine.x + maxSpeed * this.rulerLength / mSpeed, this.origine.y, (mSpeed - maxSpeed) * this.rulerLength / mSpeed, -this.maxHeight);
	}
	this.setSpeed = function (groundSpeed, airSpeed) {

		var mSpeed = this.pas * this.nbrOfDivision;
		if (typeof airSpeed === 'undefined') {
			airSpeed = '???';
		}
		else {
			// Drawing of the air speed
			ctx2.beginPath();
			ctx2.lineWidth = '3';
			if (airSpeed > this.pas * this.nbrOfDivision) {
				ctx2.strokeStyle = 'RGBa(200,0,0,1)';
				ctx2.moveTo(this.origine.x + this.rulerLength, this.origine.y);
				ctx2.lineTo(this.origine.x + this.rulerLength, this.origine.y - this.maxHeight * 3 / 2);
			}
			else if (airSpeed < 0) {
				ctx2.strokeStyle = 'RGBa(200,0,0,1)';
				ctx2.moveTo(this.origine.x, this.origine.y);
				ctx2.lineTo(this.origine.x, this.origine.y - this.maxHeight * 3 / 2);
			}
			else {
				ctx2.strokeStyle = 'RGBa(200,100,100,1)';
				ctx2.moveTo(this.origine.x + airSpeed * this.rulerLength / mSpeed, this.origine.y);
				ctx2.lineTo(this.origine.x + airSpeed * this.rulerLength / mSpeed, this.origine.y - this.maxHeight * 3 / 2);
			}
			ctx2.stroke();
			ctx2.font = '20px serif';
			ctx2.textAlign = "left";
			ctx2.textBaseline = "bottom";
			ctx2.fillStyle = 'RGBa(200, 200,0,1)';
			ctx2.fillText(airSpeed + ' m/s', this.origine.x + rulerLength * 101 / 100, this.origine.y - 2 * this.maxHeight / 2);
		}
		if (typeof groundSpeed === 'undefined') {
			groundSpeed = '???';
		}
		else {

			// Drawing of ground speed
			ctx2.beginPath();
			ctx2.lineWidth = '3';
			if (groundSpeed > this.pas * this.nbrOfDivision) {
				ctx2.strokeStyle = 'RGBa(200,0,0,1)';
				ctx2.moveTo(this.origine.x + this.rulerLength, this.origine.y);
				ctx2.lineTo(this.origine.x + this.rulerLength, this.origine.y - this.maxHeight * 3 / 2);
			}
			else if (groundSpeed < 0) {
				ctx2.strokeStyle = 'RGBa(200,0,0,1)';
				ctx2.moveTo(this.origine.x, this.origine.y);
				ctx2.lineTo(this.origine.x, this.origine.y - this.maxHeight * 3 / 2);
			}
			else {
				ctx2.strokeStyle = 'RGBa(200,100,100,1)';
				ctx2.moveTo(this.origine.x + groundSpeed * this.rulerLength / mSpeed, this.origine.y);
				ctx2.lineTo(this.origine.x + groundSpeed * this.rulerLength / mSpeed, this.origine.y - this.maxHeight * 3 / 2);
			}
			ctx2.stroke();
			ctx2.font = '20px serif';
			ctx2.textAlign = "left";
			ctx2.textBaseline = "top";
			ctx2.fillStyle = 'RGBa(200,100,100,1)';
			ctx2.fillText(groundSpeed + ' m/s', this.origine.x + rulerLength * 101 / 100, this.origine.y - this.maxHeight / 2);
		}
	}
}


// anemometer.draw();
// anemometer.setCriticalArea(5, 9);
// anemometer.setSpeed(5,6);

function Altimeter(origine, rulerLength, maxWight, nbrOfDivision, pas) {
	this.origine = origine;
	this.rulerLength = rulerLength;
	this.maxWight = maxWight;
	this.nbrOfDivision = nbrOfDivision;
	this.pas = pas;
	this.draw = function () {
		//Drawing of ruler
		ctx1.beginPath();
		ctx1.strokeStyle = 'RGBa(0,0,200,1)';
		ctx1.lineWidth = '0.5';
		//vertical line of ruler
		ctx1.moveTo(this.origine.x, this.origine.y);
		ctx1.lineTo(this.origine.x, this.origine.y + this.rulerLength);
		ctx1.stroke();
		//make of graduation
		for (var i = 0; i <= this.nbrOfDivision; i++) {
			ctx1.moveTo(this.origine.x, this.origine.y + this.rulerLength * i / (this.nbrOfDivision));
			ctx1.lineTo(this.origine.x + this.maxWight, this.origine.y + this.rulerLength * i / (this.nbrOfDivision));
			ctx1.stroke();
		}
		for (var i = 0; i <= this.nbrOfDivision - 1; i++) {
			ctx1.moveTo(this.origine.x, this.origine.y + this.rulerLength * (i + 0.5) / (this.nbrOfDivision));
			ctx1.lineTo(this.origine.x - this.maxWight / 2, this.origine.y + this.rulerLength * (i + 0.5) / (this.nbrOfDivision));
			ctx1.stroke();
		}
	}
	this.setCriticalArea = function (minAltitude, maxAltitude) {
		//draw critical zone of fly
		ctx1.beginPath();
		var mAltitude = this.pas * this.nbrOfDivision;
		ctx1.fillStyle = 'RGBa(50,200,100,0.5)';
		ctx1.fillRect(this.origine.x, this.origine.y + this.rulerLength - minAltitude * this.rulerLength / mAltitude, this.maxWight, -((maxAltitude - minAltitude) * this.rulerLength / mAltitude));
		ctx1.fillStyle = 'RGBa(255,50,50,0.5)';
		ctx1.fillRect(this.origine.x, this.rulerLength + this.origine.y - maxAltitude * this.rulerLength / mAltitude, this.maxWight, -((mAltitude - maxAltitude) * this.rulerLength / mAltitude));
	}
	this.setAltitude = function (altitude, verticalSpeed) {
		// draw the bar of altitude
		var mAltitude = this.pas * this.nbrOfDivision;

		// Drawing of altitude
		ctx2.beginPath();
		ctx2.lineWidth = '3';
		if (altitude > this.pas * this.nbrOfDivision) {
			ctx2.strokeStyle = 'RGBa(200,0,0,1)';
			ctx2.moveTo(this.origine.x, this.origine.y);
			ctx2.lineTo(this.origine.x + this.maxWight * 3 / 2, this.origine.y);
		}
		else if (altitude < 0) {
			ctx2.strokeStyle = 'RGBa(200,0,0,1)';
			ctx2.moveTo(this.origine.x, this.rulerLength + this.origine.y);
			ctx2.lineTo(this.origine.x + this.maxWight * 3 / 2, this.rulerLength + this.origine.y);
		}
		else {
			ctx2.strokeStyle = 'RGBa(200, 200,0,1)';
			ctx2.moveTo(this.origine.x, this.rulerLength + this.origine.y - altitude * this.rulerLength / mAltitude);
			ctx2.lineTo(this.origine.x + this.maxWight * 3 / 2, this.rulerLength + this.origine.y - altitude * this.rulerLength / mAltitude);
		}
		ctx2.stroke();
		ctx2.font = '20px serif';
		ctx2.fillStyle = 'RGBa(200, 200,0,1)';
		ctx2.fillText(altitude, this.origine.x + rulerLength * 101 / 100, this.origine.y);
		ctx2.font = '20px serif';
		ctx2.textAlign = "center";
		ctx2.textBaseline = "bottom";
		ctx2.fillStyle = 'RGBa(0, 0,200,1)';
		ctx2.fillText(altitude + ' m', this.origine.x, this.origine.y - rulerLength * 2 / 100);

		// Drawing of vetical speed
		if (typeof verticalSpeed === 'undefined') {
			verticalSpeed = '???';
		}
		ctx2.font = '20px serif';
		ctx2.textAlign = "center";
		ctx2.textBaseline = "top";
		ctx2.fillStyle = 'RGBa(0, 0, 200,1)';
		ctx2.fillText(verticalSpeed + ' m/s', this.origine.x, this.origine.y + rulerLength * 102 / 100);
	}
}

// altimeter.draw();
// altimeter.setCriticalArea(5,6);
// altimeter.setAltitude(1.5);

function polarToCartesian(origine, radius, angle) {
	return point = new Point(origine.x + radius * Math.cos(angle), origine.y + radius * Math.sin(angle));
}

function Compas(origine, radius, originAngle, nbrOfDivision, pas) {
	this.origine = origine;
	this.externalRadius = radius;
	this.internalRadius = radius * 70 / 100;
	this.originAngle = originAngle;
	this.nbrOfDivision = nbrOfDivision;
	this.pas = pas;

	this.draw = function () {

		// Drawing of external circle
		ctx1.beginPath();
		ctx1.strokeStyle = 'RGBa(0,50,50,1)';
		ctx1.lineWidth = '4';
		ctx1.arc(this.origine.x, this.origine.y, this.externalRadius, 0, 2 * Math.PI);
		ctx1.stroke();

		// Drawing of internal circle
		ctx1.lineWidth = '3';
		ctx1.beginPath();
		ctx1.arc(this.origine.x, this.origine.y, this.internalRadius, 0, 2 * Math.PI);
		ctx1.stroke();
		//drawing graduition
		var point1 = polarToCartesian(this.origine, this.internalRadius, this.originAngle);
		var point2 = polarToCartesian(this.origine, this.internalRadius + (this.externalRadius - this.internalRadius) * 3 / 4, this.originAngle);
		ctx1.beginPath();

		ctx1.lineWidth = '2';
		ctx1.strokeStyle = 'RGBa(0,0,150,1)';
		for (var i = 1; i <= this.nbrOfDivision; i++) {
			ctx1.moveTo(point1.x, point1.y);
			ctx1.lineTo(point2.x, point2.y);
			ctx1.stroke();
			point1 = polarToCartesian(this.origine, this.internalRadius, this.originAngle + i * 2 * Math.PI / this.nbrOfDivision);
			point2 = polarToCartesian(this.origine, this.internalRadius + (this.externalRadius - this.internalRadius) / 2, this.originAngle + i * 2 * Math.PI / this.nbrOfDivision);

		}

		point1 = polarToCartesian(this.origine, this.internalRadius, this.originAngle + Math.PI / this.nbrOfDivision);
		point2 = polarToCartesian(this.origine, this.internalRadius + (this.externalRadius - this.internalRadius) / 4, this.originAngle + Math.PI / this.nbrOfDivision);
		for (var i = 1; i <= this.nbrOfDivision; i++) {
			ctx1.moveTo(point1.x, point1.y);
			ctx1.lineTo(point2.x, point2.y);
			ctx1.stroke();
			point1 = polarToCartesian(this.origine, this.internalRadius, this.originAngle + Math.PI / this.nbrOfDivision + i * 2 * Math.PI / this.nbrOfDivision);
			point2 = polarToCartesian(this.origine, this.internalRadius + (this.externalRadius - this.internalRadius) / 4, this.originAngle + Math.PI / this.nbrOfDivision + i * 2 * Math.PI / this.nbrOfDivision);
		}


		ctx1.font = defaultval.compas.textProperty.font;
		ctx1.textAlign = defaultval.compas.textProperty.textAlign;
		ctx1.textBaseline = defaultval.compas.textProperty.textBaseline;
		ctx1.fillStyle = defaultval.compas.textProperty.fillStyle;

		//ctx1.arc(this.origine.x,this.origine.x,this.internalRadius,0, 2 * Math.PI);

		point1 = polarToCartesian(this.origine, this.internalRadius + (this.externalRadius - this.internalRadius) * 4 / 5, this.originAngle);
		ctx1.fillText('N', point1.x, point1.y);
		point1 = polarToCartesian(this.origine, this.internalRadius + (this.externalRadius - this.internalRadius) * 4 / 5, this.originAngle + Math.PI / 2);
		ctx1.fillText('E', point1.x, point1.y);
		point1 = polarToCartesian(this.origine, this.internalRadius + (this.externalRadius - this.internalRadius) * 4 / 5, this.originAngle + Math.PI * 2 / 2);
		ctx1.fillText('S', point1.x, point1.y);
		point1 = polarToCartesian(this.origine, this.internalRadius + (this.externalRadius - this.internalRadius) * 4 / 5, this.originAngle + Math.PI * 3 / 2);
		ctx1.fillText('O', point1.x, point1.y);
	}
	this.setCap = function (cap) {
		var point1 = polarToCartesian(this.origine, this.internalRadius, this.originAngle + cap);
		ctx2.beginPath();
		ctx2.fillStyle = 'RGBa(0, 200, 0, 0.5)'
		ctx2.moveTo(point1.x, point1.y);
		point1 = polarToCartesian(this.origine, this.internalRadius, this.originAngle + cap + Math.PI * 14 / 15);
		ctx2.lineTo(point1.x, point1.y);
		point1 = polarToCartesian(this.origine, this.internalRadius * 0 / 100, this.originAngle + cap + Math.PI);
		ctx2.lineTo(point1.x, point1.y);
		point1 = polarToCartesian(this.origine, this.internalRadius, this.originAngle + cap + Math.PI * 16 / 15);
		ctx2.lineTo(point1.x, point1.y);
		ctx2.closePath();
		ctx2.fill();

		point1 = polarToCartesian(this.origine, this.internalRadius * 0 / 100, this.originAngle + Math.PI);
		ctx2.font = '20px serif';
		ctx2.textAlign = defaultval.compas.textProperty.textAlign;
		ctx2.textBaseline = defaultval.compas.textProperty.textBaseline;
		ctx2.fillStyle = defaultval.compas.textProperty.fillStyle;
		ctx2.fillText(parseInt(cap * 180 / Math.PI) + '°', point1.x, point1.y);
	}
}
// compas.draw();
// compas.setCap(Math.PI/2);

function ArtificialHorizon(origine, radius, nbrOfDivisionR, nbrOfDivisionV, angleR, angleV, pasR, pasV) {
	this.origine = origine;
	this.radius = radius;
	this.nbrOfDivisionR = nbrOfDivisionR;
	this.nbrOfDivisionV = nbrOfDivisionV;
	this.angleR = angleR;
	this.angleV = angleV;
	this.pasR = pasR;
	this.pasV = pasV;

	this.draw = function () {

		//drawing of static part of artificial horizon
		var point1 = polarToCartesian(this.origine, this.radius * 75 / 100, 0);
		ctx1.beginPath();
		ctx1.lineWidth = '3';
		ctx1.strokeStyle = 'RGBa(100,150,0,1)';
		ctx1.moveTo(point1.x, point1.y);
		point1 = polarToCartesian(this.origine, this.radius * 8 / 100, 0);
		ctx1.lineTo(point1.x, point1.y);
		point1 = polarToCartesian(this.origine, this.radius * 8 / 100, Math.PI / 2);
		ctx1.lineTo(point1.x, point1.y);
		point1 = polarToCartesian(this.origine, this.radius * 8 / 100, Math.PI);
		ctx1.lineTo(point1.x, point1.y);
		point1 = polarToCartesian(this.origine, this.radius * 75 / 100, Math.PI);
		ctx1.lineTo(point1.x, point1.y);
		ctx1.stroke();

		ctx1.beginPath();
		ctx1.fillStyle = 'RGBa(200,0,0,1)';
		point1 = polarToCartesian(this.origine, this.radius * 80 / 100, -Math.PI / 2);
		ctx1.moveTo(point1.x, point1.y);
		point1 = polarToCartesian(this.origine, this.radius * 70 / 100, -Math.PI * 7 / 15);
		ctx1.lineTo(point1.x, point1.y);
		point1 = polarToCartesian(this.origine, this.radius * 70 / 100, -Math.PI * 8 / 15);
		ctx1.lineTo(point1.x, point1.y);
		ctx1.fill();

		ctx1.beginPath();
		ctx1.fillStyle = 'RGBa(0, 0, 0,1)';
		ctx1.arc(this.origine.x, this.origine.y, this.radius * 1 / 100, 0, 2 * Math.PI);
		ctx1.fill();
	}
	this.setVerticalInclination = function (angle) {
		//angle = angle%360;
		//drawing graduition
		var point1 = polarToCartesian(this.origine, this.radius * 80 / 100, angle - Math.PI / 2);
		var point2 = polarToCartesian(this.origine, this.radius, angle - Math.PI / 2);
		ctx2.beginPath();
		ctx2.lineWidth = '2';
		ctx2.strokeStyle = 'RGBa(200,50,0,1)';
		ctx2.moveTo(point1.x, point1.y);
		ctx2.lineTo(point2.x, point2.y);
		ctx2.stroke();
		ctx2.beginPath();
		ctx2.strokeStyle = 'RGBa(0,0,150,1)';
		for (var i = 1; i <= this.nbrOfDivisionR; i++) {
			point1 = polarToCartesian(this.origine, this.radius * 80 / 100, angle - Math.PI / 2 + i * this.angleR / this.nbrOfDivisionR);
			point2 = polarToCartesian(this.origine, this.radius * 90 / 100, angle - Math.PI / 2 + i * this.angleR / this.nbrOfDivisionR);
			ctx2.moveTo(point1.x, point1.y);
			ctx2.lineTo(point2.x, point2.y);
			ctx2.stroke();
		}
		for (var i = 1; i <= this.nbrOfDivisionR; i++) {
			point1 = polarToCartesian(this.origine, this.radius * 80 / 100, angle - Math.PI / 2 + (i - 1 / 2) * this.angleR / this.nbrOfDivisionR);
			point2 = polarToCartesian(this.origine, this.radius * 85 / 100, angle - Math.PI / 2 + (i - 1 / 2) * this.angleR / this.nbrOfDivisionR);
			ctx2.moveTo(point1.x, point1.y);
			ctx2.lineTo(point2.x, point2.y);
			ctx2.stroke();
		}
		for (var i = 1; i <= this.nbrOfDivisionR; i++) {
			point1 = polarToCartesian(this.origine, this.radius * 80 / 100, angle - Math.PI / 2 - i * this.angleR / this.nbrOfDivisionR);
			point2 = polarToCartesian(this.origine, this.radius * 90 / 100, angle - Math.PI / 2 - i * this.angleR / this.nbrOfDivisionR);
			ctx2.moveTo(point1.x, point1.y);
			ctx2.lineTo(point2.x, point2.y);
			ctx2.stroke();
		}
		for (var i = 1; i <= this.nbrOfDivisionR; i++) {
			point1 = polarToCartesian(this.origine, this.radius * 80 / 100, angle - Math.PI / 2 - (i - 1 / 2) * this.angleR / this.nbrOfDivisionR);
			point2 = polarToCartesian(this.origine, this.radius * 85 / 100, angle - Math.PI / 2 - (i - 1 / 2) * this.angleR / this.nbrOfDivisionR);
			ctx2.moveTo(point1.x, point1.y);
			ctx2.lineTo(point2.x, point2.y);
			ctx2.stroke();
		}
		ctx2.beginPath();
		ctx2.font = '20px serif';
		ctx2.textAlign = "center";
		ctx2.textBaseline = "top";
		ctx2.fillStyle = 'RGBa(0, 0, 200,1)';
		point1 = polarToCartesian(this.origine, this.radius * 68 / 100, -Math.PI / 2);
		ctx2.fillText(parseInt(angle * 180 / Math.PI) + '°', point1.x, point1.y);
	}
	this.setHorizontalInclinatiion = function (angle, verticalInclination) {
		var x = this.radius * (70 / 100) - this.radius * (70 / 100) * angle / this.angleV;
		var y = x / (this.radius * (70 / 100) / this.nbrOfDivisionV);
		var point3 = polarToCartesian(this.origine, angle * this.radius * (70 / 100) / this.angleV, verticalInclination - Math.PI / 2);
		var point1 = polarToCartesian(point3, this.radius * 70 / 100, verticalInclination);
		var point2 = polarToCartesian(point3, this.radius * 70 / 100, Math.PI + verticalInclination);
		ctx2.beginPath();
		ctx2.lineWidth = '2';
		ctx2.strokeStyle = 'RGBa(0,0,255,0.1)';
		ctx2.moveTo(point1.x, point1.y);
		ctx2.lineTo(point2.x, point2.y);
		ctx2.stroke();
		for (var i = 1; i <= Math.min(parseInt(y), this.nbrOfDivisionV); i++) {
			point3 = polarToCartesian(this.origine, angle * this.radius * (70 / 100) / this.angleV + i * this.radius * (70 / 100) / this.nbrOfDivisionV, verticalInclination - Math.PI / 2);
			point1 = polarToCartesian(point3, this.radius * 4 / 100 + (i - 1) * (this.radius * 40 / 100) / nbrOfDivisionV, verticalInclination);
			point2 = polarToCartesian(point3, this.radius * 4 / 100 + (i - 1) * (this.radius * 40 / 100) / nbrOfDivisionV, Math.PI + verticalInclination);
			ctx2.moveTo(point1.x, point1.y);
			ctx2.lineTo(point2.x, point2.y);
			ctx2.stroke();
		}
		for (var i = 1; i <= Math.min(parseInt(y), this.nbrOfDivisionV); i++) {
			point3 = polarToCartesian(this.origine, angle * this.radius * (70 / 100) / this.angleV + (i - 1 / 2) * this.radius * (70 / 100) / this.nbrOfDivisionV, verticalInclination - Math.PI / 2);
			point1 = polarToCartesian(point3, this.radius * 1 / 100 + (i - 1) * (this.radius * 10 / 100) / nbrOfDivisionV, verticalInclination);
			point2 = polarToCartesian(point3, this.radius * 1 / 100 + (i - 1) * (this.radius * 10 / 100) / nbrOfDivisionV, Math.PI + verticalInclination);
			ctx2.moveTo(point1.x, point1.y);
			ctx2.lineTo(point2.x, point2.y);
			ctx2.stroke();
		}
		x = this.radius * (70 / 100) + this.radius * (70 / 100) * angle / this.angleV;
		y = x / (this.radius * (70 / 100) / this.nbrOfDivisionV);
		ctx2.beginPath();
		ctx2.strokeStyle = 'RGBa(200,100,0,0.1)';
		for (var i = 1; i <= Math.min(parseInt(y), this.nbrOfDivisionV); i++) {
			point3 = polarToCartesian(this.origine, angle * this.radius * (70 / 100) / this.angleV - i * this.radius * (70 / 100) / this.nbrOfDivisionV, verticalInclination - Math.PI / 2);
			point1 = polarToCartesian(point3, this.radius * 4 / 100 + (i - 1) * (this.radius * 40 / 100) / nbrOfDivisionV, verticalInclination);
			point2 = polarToCartesian(point3, this.radius * 4 / 100 + (i - 1) * (this.radius * 40 / 100) / nbrOfDivisionV, Math.PI + verticalInclination);
			ctx2.moveTo(point1.x, point1.y);
			ctx2.lineTo(point2.x, point2.y);
			ctx2.stroke();
		}
		for (var i = 1; i <= Math.min(parseInt(y), this.nbrOfDivisionV); i++) {
			point3 = polarToCartesian(this.origine, angle * this.radius * (70 / 100) / this.angleV - (i - 1 / 2) * this.radius * (70 / 100) / this.nbrOfDivisionV, verticalInclination - Math.PI / 2);
			point1 = polarToCartesian(point3, this.radius * 1 / 100 + (i - 1) * (this.radius * 10 / 100) / nbrOfDivisionV, verticalInclination);
			point2 = polarToCartesian(point3, this.radius * 1 / 100 + (i - 1) * (this.radius * 10 / 100) / nbrOfDivisionV, Math.PI + verticalInclination);
			ctx2.moveTo(point1.x, point1.y);
			ctx2.lineTo(point2.x, point2.y);
			ctx2.stroke();
		}
		ctx2.beginPath();
		ctx2.font = '20px serif';
		ctx2.textAlign = "center";
		ctx2.textBaseline = "bottom";
		ctx2.fillStyle = 'RGBa(0, 0, 200,1)';
		point1 = polarToCartesian(this.origine, this.radius * 60 / 100, (-1 / 100) * Math.PI);
		ctx2.fillText(parseInt(angle * 180 / Math.PI) + '°', point1.x, point1.y);
	}
	this.setState = function (horizontalInclination, verticalInclination) {
		this.setVerticalInclination(verticalInclination);
		this.setHorizontalInclinatiion(horizontalInclination, verticalInclination);
	}
}


// artificialHorizon.draw();
// artificialHorizon.setState(Math.PI/10, -Math.PI/4);

function SkidIndicator(origine, internalRadius, externalRadius, angle) {
	this.origine = origine;
	this.internalRadius = internalRadius;
	this.externalRadius = externalRadius;
	this.angle = angle;

	this.draw = function () {
		ctx1.beginPath();
		ctx1.strokeStyle = 'RGBa(0, 0, 0,1)';
		ctx1.arc(this.origine.x, this.origine.y, this.internalRadius, Math.PI / 2 - this.angle, Math.PI / 2 + this.angle);
		ctx1.stroke();
		ctx1.beginPath();
		ctx1.strokeStyle = 'RGBa(0, 0, 0,1)';
		ctx1.arc(this.origine.x, this.origine.y, this.externalRadius, Math.PI / 2 - this.angle, Math.PI / 2 + this.angle);
		ctx1.stroke();

		var point1 = polarToCartesian(this.origine, this.internalRadius + (this.externalRadius - this.internalRadius) / 2, Math.PI / 2 - this.angle);
		ctx1.beginPath();
		ctx1.strokeStyle = 'RGBa(0, 0, 0,1)';
		ctx1.arc(point1.x, point1.y, (this.externalRadius - this.internalRadius) / 2, 3 * Math.PI / 2 - this.angle, Math.PI / 2 - this.angle);
		ctx1.stroke();

		point1 = polarToCartesian(this.origine, this.internalRadius + (this.externalRadius - this.internalRadius) / 2, Math.PI / 2 + this.angle);

		ctx1.beginPath();
		ctx1.strokeStyle = 'RGBa(0, 0, 0,1)';
		ctx1.arc(point1.x, point1.y, (this.externalRadius - this.internalRadius) / 2, Math.PI / 2 + this.angle, 3 * Math.PI / 2 + this.angle);
		ctx1.stroke();

		point1 = polarToCartesian(this.origine, this.internalRadius, Math.PI / 2);
		var point2 = polarToCartesian(this.origine, this.externalRadius, Math.PI / 2);
		ctx1.beginPath();
		ctx1.lineWidth = '2';
		ctx1.strokeStyle = 'RGBa(200,50,0,1)';
		ctx1.moveTo(point1.x, point1.y);
		ctx1.lineTo(point2.x, point2.y);
		ctx1.stroke();
	}
	this.setApparentVertical = function (deviation) {
		var point1 = polarToCartesian(this.origine, this.internalRadius + (this.externalRadius - this.internalRadius) / 2, Math.PI / 2 + deviation);
		ctx2.fillStyle = 'RGBa(0, 0, 0,1)';
		if (deviation > this.angle) {
			point1 = polarToCartesian(this.origine, this.internalRadius + (this.externalRadius - this.internalRadius) / 2, Math.PI / 2 + angle);
			ctx2.fillStyle = 'RGBa(255, 0, 0,1)';
		}
		else if (deviation < -this.angle) {
			point1 = polarToCartesian(this.origine, this.internalRadius + (this.externalRadius - this.internalRadius) / 2, Math.PI / 2 - angle);
			ctx2.fillStyle = 'RGBa(255, 0, 0,1)';
		}
		ctx2.beginPath();
		ctx2.arc(point1.x, point1.y, (this.externalRadius - this.internalRadius) / 2, 0, Math.PI * 2);
		ctx2.fill();
	}
}


// skidIndicator.draw();
// skidIndicator.setApparentVertical(Math.PI/10);

function Dashboard(anemometer, altimeter, compas, artificialHorizon, skidIndicator, bottomDashbord) {
	this.anemometer = anemometer;
	this.altimeter = altimeter;
	this.compas = compas;
	this.artificialHorizon = artificialHorizon;
	this.skidIndicator = skidIndicator;
	this.bottomDashbord = bottomDashbord;
	this.drawDashboarder = function () {
		this.anemometer.draw();
		this.altimeter.draw();
		this.compas.draw();
		this.artificialHorizon.draw();
		this.skidIndicator.draw();
		this.anemometer.setCriticalArea(5, 9);
		altimeter.setCriticalArea(5, 6);
		this.bottomDashbord.drawBottomDashboarder();
	}
	this.refreshDashboarder = function (groundSpeed, airSpeed, altitude, verticalSpeed, cap, horizontalInclination, verticalInclination, verticalDeviation, bottomDashbordValues) {
		ctx2.clearRect(0, 0, canvasWight, canvasHeight);
		ctx2.beginPath();
		this.anemometer.setSpeed(groundSpeed, airSpeed);
		this.altimeter.setAltitude(altitude, verticalSpeed);
		this.compas.setCap(cap);
		this.artificialHorizon.setState(horizontalInclination, verticalInclination);
		this.skidIndicator.setApparentVertical(verticalDeviation);
		if (bottomDashbordValues === undefined) {
			console.log("ici")
			this.bottomDashbord.refreshBottomDashboarder()
		}
		else {
			this.bottomDashbord.refreshBottomDashboarder(bottomDashbordValues);
		}
	}
}

function Battery(origine, charge) {
	this.origine = origine;
	this.context = ctx2;
	this.charge = (typeof charge == 'number') ? charge : 0;
	this.width = 100;
	this.height = 50;
	this.ContenairlineWidth = 5;

	this.drawWalls = function () {
		this.context.beginPath();
		this.context.rect(this.origine.x, this.origine.y, this.width, this.height);
		this.context.lineWidth = this.ContenairlineWidth;
		this.context.strokeStyle = 'black';
		this.context.stroke();

		this.context.beginPath();
		this.context.rect(this.origine.x + this.width + this.ContenairlineWidth, this.origine.y + this.height / 2 - this.ContenairlineWidth * 2, this.ContenairlineWidth * 2, this.ContenairlineWidth * 4);
		this.context.fillStyle = 'black';
		this.context.fill();
		this.context.stroke();
	};

	this.drawCharge = function (charge) {
		if (charge > 100) {
			charge = 100;
		}
		this.context.beginPath();
		this.context.font = '20px serif';
		this.context.textAlign = "center";
		// ctx2.textBaseline = "bottom";
		this.context.fillStyle = 'black';
		this.context.fillText(charge + '%', this.origine.x + this.width / 2, this.origine.y + this.height / 2);
		this.context.rect(this.origine.x + this.ContenairlineWidth / 2, this.origine.y + this.ContenairlineWidth / 2, (this.width - this.ContenairlineWidth) * (charge / 100), this.height - this.ContenairlineWidth);
		this.context.fillStyle = 'rgb(' + Math.floor((1 - (charge / 100)) * 255) + ',' + Math.floor((charge / 100) * 255) + ',0)';
		this.context.fill();
		if (charge > 20) {
			this.context.beginPath();
			this.context.font = '20px serif';
			this.context.textAlign = "center";
			// ctx2.textBaseline = "bottom";
			this.context.fillStyle = 'black';
			this.context.fillText(charge + '%', this.origine.x + this.width / 2, this.origine.y + this.height / 2);
		}
	};

	this.clearCharge = function () {
		this.context.clearRect(this.origine.x + this.ContenairlineWidth, this.origine.y + this.ContenairlineWidth, this.width - this.ContenairlineWidth, this.height - this.ContenairlineWidth);
	};

	this.setCharge = function (charge) {
		this.drawWalls();
		this.charge = (typeof charge == 'number') ? charge : this.charge;
		//this.clearCharge();
		this.drawCharge(this.charge);
	};
	this.draw = function () {
		this.drawWalls();
		if (this.charge) this.drawCharge(this.charge);
	}
}

function Power(origine, power) {
	this.origine = origine;
	this.context = ctx2;
	this.power = (typeof power == 'number') ? power : 0;
	this.width = canvasWight / 8;
	this.height = 50;
	this.ContenairlineWidth = 5;

	this.drawWalls = function () {
		this.context.beginPath();
		this.context.rect(this.origine.x, this.origine.y, this.width, this.height);
		this.context.lineWidth = this.ContenairlineWidth;
		this.context.strokeStyle = 'black';
		this.context.stroke();
	};

	this.drawPower = function (power) {
		if (power > 100) {
			power = 100;
		}
		this.context.beginPath();
		this.context.font = '20px serif';
		this.context.textAlign = "center";
		ctx2.textBaseline = "bottom";
		this.context.fillStyle = 'black';
		this.context.fillText(power + '%', this.origine.x + this.width / 2, this.origine.y + this.height / 2);
		this.context.rect(this.origine.x + this.ContenairlineWidth / 2, this.origine.y + this.ContenairlineWidth / 2, (this.width - this.ContenairlineWidth) * (power / 100), this.height - this.ContenairlineWidth);
		this.context.fillStyle = 'rgb(' + Math.floor((1 - (power / 100)) * 255) + ',' + Math.floor((power / 100) * 255) + ',0)';
		this.context.fill();
		if (power > 20) {
			this.context.beginPath();
			this.context.font = '20px serif';
			this.context.textAlign = "center";
			// ctx2.textBaseline = "bottom";
			this.context.fillStyle = 'black';
			this.context.fillText(power + '%', this.origine.x + this.width / 2, this.origine.y + this.height / 2);
		}
	};

	this.clearPower = function () {
		this.context.clearRect(this.origine.x + this.ContenairlineWidth, this.origine.y + this.ContenairlineWidth, this.width - this.ContenairlineWidth, this.height - this.ContenairlineWidth);
	};

	this.setPower = function (power) {
		this.drawWalls();
		this.power = (typeof power == 'number') ? power : this.power;
		//this.clearCharge();
		this.drawPower(this.power);
	};
	this.draw = function () {
		this.drawWalls();
		if (this.power) this.drawPower(this.power);
	}

}

function Aileron(origine, angle1, angle2) {
	this.origine = origine;
	this.angle1 = angle1;
	this.angle2 = angle2;
	this.draw = function () {
		ctx2.fillStyle = 'RGBa(0, 0, 0,1)';
		ctx2.lineWidth = '3';
		ctx2.beginPath();
		ctx2.font = '20px serif';
		ctx2.textAlign = "center";
		// ctx2.textBaseline = "bottom";
		ctx2.fillStyle = 'RGBa(0, 0, 200,1)';
		ctx2.fillText('Aileron : ' + this.angle1 + '°' + '/' + this.angle2 + '°', this.origine.x, this.origine.y + 50);
		ctx2.stroke();

	}

	this.setState = function (angle1, angle2) {
		this.angle1 = angle1;
		this.angle2 = angle2
		this.draw();
	}
}

function GouverneD(origine, angle) {
	this.origine = origine;
	this.angle = angle;
	this.draw = function () {
		ctx2.fillStyle = 'RGBa(0, 0, 0,1)';
		ctx2.lineWidth = '3';
		ctx2.beginPath();
		ctx2.font = '20px serif';
		ctx2.textAlign = "bottom";
		ctx2.textBaseline = "bottom";
		ctx2.fillStyle = 'RGBa(0, 0, 200,1)';
		ctx2.fillText('Gouverne D : ' + this.angle + '°', this.origine.x, this.origine.y + 50);
		ctx2.stroke();

	}

	this.setState = function (angle) {
		this.angle = angle;
		this.draw();
	}
}

function GouverneP(origine, angle) {
	this.origine = origine;
	this.angle = angle;
	this.draw = function () {
		ctx2.fillStyle = 'RGBa(0, 0, 0,1)';
		ctx2.lineWidth = '3';
		ctx2.beginPath();
		ctx2.font = '20px serif';
		ctx2.textAlign = "center";
		// ctx2.textBaseline = "bottom";
		ctx2.fillStyle = 'RGBa(0, 0, 200,1)';
		ctx2.fillText('Gouverne P : ' + this.angle + '°', this.origine.x, this.origine.y + 50);
		ctx2.stroke();

	}

	this.setState = function (angle) {
		this.angle = angle;
		this.draw();
	}
}

function BottomDashBord(power, aileron, gouverneD, gouverneP, battery) {
	this.power = power;
	this.aileron = aileron;
	this.gouverneD = gouverneD;
	this.gouverneP = gouverneP;
	this.battery = battery;

	this.drawBottomDashboarder = function () {
		this.power.draw();
		this.aileron.draw();
		this.gouverneD.draw();
		this.gouverneP.draw();
		this.battery.draw();
	}
	this.refreshBottomDashboarder = function (value) {
		//ctx2.clearRect(0, 0, canvasWight, canvasHeight);
		if (value === undefined) {
			value = {
				power:
					{ power: this.power.power },
				aileron: {
					angle1: this.aileron.angle1,
					angle2: this.aileron.angle2
				},
				gouverneP: {
					angle: this.gouverneP.angle
				},
				gouverneD: {
					angle: this.gouverneD.angle
				},
				battery: {
					charge: this.battery.charge
				}
			}
		}
		ctx2.beginPath();
		this.power.setPower(value.power.power);
		this.aileron.setState(value.aileron.angle1, value.aileron.angle2);
		this.gouverneD.setState(value.gouverneD.angle);
		this.gouverneP.setState(value.gouverneP.angle);
		this.battery.setCharge(value.battery.charge);
	}
}


function buildBottomDashBord() {
	var power = new Power(new Point(canvasWight / 9, canvasHeight - 50), 45);
	var aileron = new Aileron(new Point(2 * (canvasWight / 9 + canvasWight / 18), canvasHeight - 50), 10, 7);
	var gouverneD = new GouverneD(new Point(3 * (canvasWight / 9 + canvasWight / 18), canvasHeight - 50), 10);
	var gouverneP = new GouverneP(new Point(4 * (canvasWight / 9 + canvasWight / 18), canvasHeight - 50), 15);
	var battery = new Battery(new Point(4.5 * (canvasWight / 9 + canvasWight / 18), canvasHeight - 50), 15);

	var bottomDashbord = new BottomDashBord(power, aileron, gouverneD, gouverneP, battery);
	return bottomDashbord;

}

function builDashBord() {
	var anemometer = new Anemometer(new Point(canvasWight * 25 / 100, canvasHeight * 10 / 100), canvasWight * 50 / 100, canvasHeight * 4 / 100, 10, 1);
	var skidIndicator = new SkidIndicator(new Point(canvasWight * 50 / 100, canvasHeight * 50 / 100), canvasHeight * 38 / 100, canvasHeight * 44 / 100, Math.PI / 4);
	var artificialHorizon = new ArtificialHorizon(new Point(canvasWight * 50 / 100, canvasHeight * 50 / 100), canvasHeight * 38 / 100, 4.5, 4.5, Math.PI / 2, Math.PI / 2, 3, 5);
	var compas = new Compas(new Point(canvasWight * 12.5 / 100, canvasHeight * 50 / 100), canvasWight * 10 / 100, -Math.PI / 2, 10, 1);
	var altimeter = new Altimeter(new Point(canvasWight * 90 / 100, canvasHeight * 10 / 100), canvasHeight * 80 / 100, canvasWight * 2 / 100, 10, 1);
	return new Dashboard(anemometer, altimeter, compas, artificialHorizon, skidIndicator, buildBottomDashBord());

}

//battery = new CanvasBattery(document.getElementById('batery'), 50);
//bottomDashbord.drawBottomDashboarder();
//dashboard.refreshDashboarder(100, -32, 7, 2, Math.PI / 3, Math.PI / 5, Math.PI / 10, Math.PI / 10);
//
// var i = 0;
// var increment = true;
// $('#c').click(function () {
// 	setInterval(function () {
// 		var k = i;
// 		i = Math.floor(100*i/250);
// 		value = {
// 			power:
// 				{ power: i },
// 			aileron: {
// 				angle1: i,
// 				angle2: i,
// 			},
// 			gouverneP: {
// 				angle: i,
// 			},
// 			gouverneD: {
// 				angle: i,
// 			},
// 			battery: {
// 				charge: i,
// 			}
// 		}
// 		i = k;
// 		var j = i;
// 		i = i / 100;
// 		dashboard.refreshDashboarder(7+i, 5 + i, 7 + i, 2 + i, Math.PI * i / 3, Math.PI * i / 5, Math.PI * i / 10, Math.PI * i / 10, value);
// 		i = j;
// 		if (i >= 250) {
// 			increment = false;
// 		}
// 		else if (i == 0) {
// 			increment = true;
// 		}
// 		increment && i++;
// 		!increment && i--;
// 	}, 10)
//
//})





//authenication microservice



function login(username, password, onSuccess, onfail) {
	if (localStorage.getItem('Autorization')) {
		onSuccess();
		return;
	}
	if (username === 'kritikos' && password === 'kritikos') {
		onSuccess();
		var autorization = `Basic ${btoa(username + ':' + password)}`;
		localStorage.setItem('Autorization', autorization);
	}
	else {
		var error = new Error('mauvais login');
		error.status = 400;
		onfail(error);
	}
}

const logout = () => {
	localStorage.removeItem('Autorization');
}

const getHeaders = () => {
	var token = localStorage.getItem('Autorization');
	if (token) {
		return {
			Autorization: token,
		};
	}
	else {
		return {}
	}
}








//websocket wandler

/**
 * Event handler for clicking on button "Connect"
 */
function onConnect(onConnectionError) {
	var ws_protocol = "ws";
	var ws_hostname = location.hostname
	var ws_port = "3000";
	var ws_endpoint = "control";
	return new WSConnection(ws_protocol, ws_hostname, ws_port, ws_endpoint);
}
/**
 * Open a new WebSocket connection using the given parameters
 */
function WSConnection(protocol, hostname, port, endpoint, onConnectionError) {
	var webSocketURL = null;
	//webSocketURL = protocol + "://" + hostname + ":" + port +"/"+ endpoint;
	webSocketURL = "wss://echo.websocket.org";
	console.log("openWSConnection::Connecting to: " + webSocketURL);
	try {
		this.webSocket = new WebSocket(webSocketURL);
		this.webSocket.onopen = function (openEvent) {
			console.log("WebSocket OPEN: " + JSON.stringify(openEvent, null, 4));

		};
		this.webSocket.onclose = function (closeEvent) {
			console.log("WebSocket CLOSE: " + JSON.stringify(closeEvent, null, 4));
		};
		this.webSocket.onerror = function (errorEvent) {
			console.log("WebSocket ERROR: " + JSON.stringify(errorEvent, null, 4));
		};
		this.webSocket.onmessage = function (messageEvent) {
			var wsMsg = messageEvent.data;
			console.log("WebSocket MESSAGE: " + wsMsg);
		};
	} catch (exception) {
		onConnectionError();
		console.error(exception);
	}
	/**
 * Event handler for clicking on button "Disconnect"
 */
	this.onDisconnect = function () {
		this.webSocket.close();
	}
	this.onSend = function (data) {
		if (this.webSocket.readyState != WebSocket.OPEN) {
			console.error("webSocket is not open: " + this.webSocket.readyState);
			return;
		}
		this.webSocket.send(data);
	}


}


class Conection {
	constructor(refreshTime = 100
		, onReceivedRefreshResponse = function (data) { }
		, onErrorWhenSend = function (error) { }
		, refreshRoute = "/ref") {

		this.onReceivedRefreshResponse = onReceivedRefreshResponse;
		this.onErrorWhenSend = onErrorWhenSend;
		this.refreshTime = refreshTime;
		this.refreshRoute = refreshRoute;
	}

	runForEver() {
		const { refreshRoute, onErrorWhenSend, onReceivedRefreshResponse } = this;
		setInterval(function () {
			$.ajax({
				url: refreshRoute,
				method: "GET",
				success: onReceivedRefreshResponse,
				error: onErrorWhenSend,
			})
		}, this.refreshTime);
	}

	sendData(route, onSuccess = function (data) { }, onError = function (error) { }, post = true, data = {}) {
		if (post) {
			$.ajax({
				url: route,
				method: "POST",
				success: onSuccess,
				error: onError,
				data: data,
			})
		}
		else {
			$.ajax({
				url: route,
				method: "GET",
				success: onSuccess,
				error: onError,
			})
		}
	}
}

//main controller 

$(document).ready(function () {
	var dashbord = builDashBord();
	var success = false;
	var connected = false;
	var websocket = null;

	function initSocket() {
		websocket = onConnect(function () {
			connected = false;
			$("#infoModal").modal('show');
		});
		websocket.webSocket.onclose = function () {
			connected = false;
			$("#myModal").modal('show');
		}

		websocket.webSocket.onerror = function () {
			connected = false;
			$("#info").text('Websocket non connecté');
			$("#infoModal").modal('show');
		}

		websocket.webSocket.onopen = function () {
			connected = true;
			$("#myModal").modal('hide');
		}
		websocket.webSocket.onmessage = function (data) {
			var valeursCapteurs = data.data;
			console.log(data.data);
			//dashbord.refreshDashboarder();
		}
	}

	function InitMapping() {
		$("#commandModal").modal('show');
		$("#summitMapping").click(function (e) {
			$("#commandModal").modal('hide');
		})
		componentList.forEach(element => {
			var formDiv = $(`
			<div class="form-group"> <label class = "col-md-2" for="${element}">${element}:</label> </div>
			`)
			$("#formWrapper").append(formDiv);
			var selectElt = $(`<select id = ${element} class="form-control"></select>`);
			formDiv.append(selectElt);
			PossibleMapping.forEach(elt => {
				if (!elt.shosen) {
					selectElt.append(
						`<option value = ${elt}>${elt.type} ${elt.val}</option>`
					)
				}

			});
			selectElt.change(function () {
				var val = $(this).val();
				PossibleMapping.filter(
					elt => elt.axe === val.axe && elt.val === val.val && elt.shosen === elt.shosen)[0].shosen = true;

			})
		});

	}

	function initPosition() {
		for (let i = 1; i < 5; i++) {
			PossibleMapping[i - 1] = {
				type: axe,
				val: i,
				shosen: false,
			}
		}
		for (let i = 1; i < 10; i++) {
			PossibleMapping[i - 1 + 4] = {
				type: button,
				val: i,
				shosen: false,
			}
		}

		componentList.forEach(component => {
			var ob = standartMapping[component];
			var found = PossibleMapping.filter(elt => elt.type === ob.type && elt.val === ob.position);
			if (found.length > 0) {
				found[0].shosen = true;
			}
		});
	}


	function updateMapping() {

	}

	$('#myModal').on('hide.bs.modal', function (e) {
		if (!success) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	});


	$("#infoModal").on('hide.bs.modal', function (e) {
		if (!connected) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	});

	$("#myModal").modal('show');


	$("#submitButton").click(function (e) {
		var username = $("#userNameTextBox").val();
		var password = $("#passwordTextBox").val();
		login(username, password, function () {
			success = true;
			$("#myModal").modal('hide');
			dashbord.drawDashboarder();
			dashbord.refreshDashboarder(100, -32, 7, 2, Math.PI / 3, Math.PI / 5, Math.PI / 10, Math.PI / 10);
			//initPosition();
			//InitMapping();
			//var con = new Conection();
			//con.runForEver()

		}, function (err) {
			$("#messageSpan").text(err.message);
		})

	})

})


var PossibleMapping = []
const axe = "AXE";
const button = "BUTTON";
var componentList = ["AileronG", "AileronD", "GouverneD", "GouverneP", "Puissance"]
var standartMapping = {
	"AileronG": {
		name: "Aileron Gauche",
		type: axe,
		position: 1,
	},
	"AileronD": {
		name: "Aileron Droite",
		type: axe,
		position: 2,
	},
	"GouverneD": {
		name: "Gouverne de direction",
		type: axe,
		position: 3,
	},
	"GouverneP": {
		name: "Gouverne de profondeur",
		type: axe,
		position: 4,
	},

	"Puissance": {
		name: "Puissance du moteur",
		type: button,
		position: 1,
	},
}