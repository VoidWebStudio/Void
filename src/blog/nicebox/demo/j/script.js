function nice()
{
	var form = document.getElementById('form');
	
	if(form.className.indexOf('nice')+1) return;
	
		form.className += ' nice';

	var checks = form.getElementsByTagName('label');
	var checksLnt = checks.length;
	
	for(var i=0; i<checksLnt; i++)
	{
		var curr = checks[i];

		var box = curr.firstChild;
			box.className = 'lost';

		curr.className += box.type;
		curr.className += (box.checked) ? '-on' : '-off';

		box.onclick = function()
		{
			var label = this.parentNode;

			if(this.type == 'checkbox')
			{
				label.className = (label.className.indexOf('-on')+1) ? label.className.replace('-on','-off') : label.className.replace('-off','-on');
			}

			if(this.type == 'radio')
			{
				var siblings = label.parentNode.parentNode.getElementsByTagName('input');
				var siblingsLnt = siblings.length;

				for(var j=0; j<siblingsLnt; j++)
				{
					if(siblings[j].name == this.name) {
						var check = siblings[j].parentNode;
						check.className = check.className.replace('-on','-off');
					}
				}

				label.className = label.className.replace('-off','-on');
			}
		}
	}
}