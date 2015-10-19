var emojiArr = ['😆', '😌', '😐', '😦', '😣', '😵'];
var arrLen = emojiArr.length - 1;
var index = 0;
var countClick = 0;

function changeMe(){
	var emoji = document.getElementById("emojiMe");
	emoji.innerHTML = emojiArr[index];
	countClick++;
	if (index < arrLen){
		index++;
	}
	if (countClick == 10){
		countClick = 0;
		emoji.innerHTML = '😅';
		index = 0;
	}
}
