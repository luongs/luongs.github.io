var emojiArr = ['😆', '😌', '😐', '😦', '😣', '😵'];
var arrLen = emojiArr.length - 1;
var index = 0;

function changeMe(){
	var emoji = document.getElementById("emojiMe");
	emoji.innerHTML = emojiArr[index];
	if (index < arrLen){
		index++;
	}
}
