var ltIE7 = false
/*@cc_on @if (@_jscript_version < 5.7) ltIE7 = true @end @*/

function setVote()
{
	var result = document.getElementById('result')

	var uls = document.getElementsByTagName('ul')
	var ulsLnt = uls.length

	for(var i=0; i<ulsLnt; i++)
	{
		if(uls[i].className == 'voting')
		{
			var as = uls[i].getElementsByTagName('a')
			var asLnt = as.length

			for(var j=0; j<asLnt; j++)
			{
				as[j].rel = j+1				
				as[j].onclick = function()
				{
					var sb = this.parentNode.parentNode.getElementsByTagName('a')
					var sbLnt = sb.length
					
					for(var k=0; k<sbLnt; k++)
					{
						sb[k].className = ''
					}

					this.className = 'cur'
					result.innerHTML = 'Рейтинг «' + this.rel + '» отправлен' // имитация отправки результата голосования

					return false
				}
			}

			if(ltIE7)
			{
				uls[i].onmouseover = function()
				{
					this.className += ' phover'
				}
				
				uls[i].onmouseout = function()
				{
					this.className = this.className.replace(/(^| )phover($| )/,'')
				}
			}
		}
	}
}

window.onload = setVote;