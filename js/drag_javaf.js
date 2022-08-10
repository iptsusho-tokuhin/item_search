var target = [];
target[0] = document.getElementById('select');
target[1] = document.getElementById('move');
target[2] = document.getElementById('build');
target[3] = document.getElementById('demolition');
target[4] = document.getElementById('customer');
target[5] = document.getElementById('includ');

target[0].onmousedown = function(event)
{	
	var shiftX = event.clientX - this.getBoundingClientRect().left;
	var shiftY = event.clientY - this.getBoundingClientRect().top;

	moveAt(event.pageX - shiftX, event.pageY - shiftY)
	function onMouseMove(event){moveAt(event.pageX - shiftX, event.pageY - shiftY);}
	document.addEventListener('mousemove', onMouseMove);
	this.onmouseup = function() {
		document.removeEventListener('mousemove', onMouseMove);
		this.onmouseup = null;
	};
};

target[1].onmousedown = function(event)
{	
	var shiftX = event.clientX - this.getBoundingClientRect().left;
	var shiftY = event.clientY - this.getBoundingClientRect().top;

	moveAt(event.pageX - shiftX, event.pageY - shiftY)
	function onMouseMove(event){moveAt(event.pageX - shiftX, event.pageY - shiftY);}
	document.addEventListener('mousemove', onMouseMove);
	this.onmouseup = function() {
		document.removeEventListener('mousemove', onMouseMove);
		this.onmouseup = null;
	};
};

target[2].onmousedown = function(event)
{	
	var shiftX = event.clientX - this.getBoundingClientRect().left;
	var shiftY = event.clientY - this.getBoundingClientRect().top;

	moveAt(event.pageX - shiftX, event.pageY - shiftY)
	function onMouseMove(event){moveAt(event.pageX - shiftX, event.pageY - shiftY);}
	document.addEventListener('mousemove', onMouseMove);
	this.onmouseup = function() {
		document.removeEventListener('mousemove', onMouseMove);
		this.onmouseup = null;
	};
};

target[3].onmousedown = function(event)
{	
	var shiftX = event.clientX - this.getBoundingClientRect().left;
	var shiftY = event.clientY - this.getBoundingClientRect().top;

	moveAt(event.pageX - shiftX, event.pageY - shiftY)
	function onMouseMove(event){moveAt(event.pageX - shiftX, event.pageY - shiftY);}
	document.addEventListener('mousemove', onMouseMove);
	this.onmouseup = function(){
		document.removeEventListener('mousemove', onMouseMove);
		this.onmouseup = null;
	};
};

target[4].onmousedown = function(event)
{	
	var shiftX = event.clientX - this.getBoundingClientRect().left;
	var shiftY = event.clientY - this.getBoundingClientRect().top;

	moveAt(event.pageX - shiftX, event.pageY - shiftY)
	function onMouseMove(event){moveAt(event.pageX - shiftX, event.pageY - shiftY);}
	document.addEventListener('mousemove', onMouseMove);
	this.onmouseup = function(){
		document.removeEventListener('mousemove', onMouseMove);
		this.onmouseup = null;
	};
};

target[5].onmousedown = function(event)
{	
	var shiftX = event.clientX - this.getBoundingClientRect().left;
	var shiftY = event.clientY - this.getBoundingClientRect().top;

	moveAt(event.pageX - shiftX, event.pageY - shiftY)
	function onMouseMove(event){moveAt(event.pageX - shiftX, event.pageY - shiftY);}
	document.addEventListener('mousemove', onMouseMove);
	this.onmouseup = function(){
		document.removeEventListener('mousemove', onMouseMove);
		this.onmouseup = null;
	};
};

target[0].ondragstart = function(){return false;};
target[1].ondragstart = function(){return false;};
target[2].ondragstart = function(){return false;};
target[3].ondragstart = function(){return false;};
target[4].ondragstart = function(){return false;};
target[5].ondragstart = function(){return false;};


function moveAt(pageX, pageY)
{
	target[0].style.left = pageX + 'px';
	target[0].style.top = pageY + 'px';
	target[1].style.left = pageX + 'px';
	target[1].style.top = pageY + 'px';
	target[2].style.left = pageX + 'px';
	target[2].style.top = pageY + 'px';
	target[3].style.left = pageX + 'px';
	target[3].style.top = pageY + 'px';
	target[4].style.left = pageX + 'px';
	target[4].style.top = pageY + 'px';
	target[5].style.left = pageX + 'px';
	target[5].style.top = pageY + 'px';
}