var xors = xors || {};

xors = {
	x: 123456789,
	y: 362436069,
	z: 521288629,
	w: 438201203,
	max:7
};

xors.rand = function() {
	var t;
	t = xors.x ^ (xors.x << 11);
	xors.x = xors.y;
	xors.y = xors.z;
	xors.z = xors.w;
	xors.w = xors.w=(xors.w^(xors.w>>19))^(t^(t>>8))
	return xors.w%xors.max;
}