(function () {
	'use strict';

	var root = document.querySelector('[data-alhez-assistant]');
	if (!root) return;

	var launch = root.querySelector('.alhez-assistant-launch');
	var panel = root.querySelector('.alhez-assistant-panel');
	var closeButton = root.querySelector('.alhez-assistant-close');
	var form = root.querySelector('.alhez-assistant-form');
	var input = root.querySelector('.alhez-assistant-input');
	var sendButton = root.querySelector('.alhez-assistant-send');
	var messagesElement = root.querySelector('.alhez-assistant-messages');
	var suggestions = root.querySelector('.alhez-assistant-suggestions');
	var conversation = [];
	var sending = false;
	var typingElement = null;

	function setOpen(open) {
		panel.hidden = !open;
		launch.setAttribute('aria-expanded', open ? 'true' : 'false');
		if (open) input.focus();
		else launch.focus();
	}

	function appendMessage(role, text, isError) {
		var item = document.createElement('div');
		item.className = 'alhez-assistant-message alhez-assistant-message--' + role + (isError ? ' alhez-assistant-message--error' : '');
		item.textContent = text;
		messagesElement.appendChild(item);
		messagesElement.scrollTop = messagesElement.scrollHeight;
		return item;
	}

	function setTyping(active) {
		if (!active && typingElement) {
			typingElement.remove();
			typingElement = null;
			return;
		}
		if (active && !typingElement) {
			typingElement = document.createElement('div');
			typingElement.className = 'alhez-assistant-message alhez-assistant-message--assistant alhez-assistant-typing';
			typingElement.setAttribute('aria-label', 'Assistant is typing');
			for (var dot = 0; dot < 3; dot++) typingElement.appendChild(document.createElement('span'));
			messagesElement.appendChild(typingElement);
			messagesElement.scrollTop = messagesElement.scrollHeight;
		}
	}

	async function sendMessage(value) {
		var text = (value || '').trim();
		if (!text || sending) return;

		input.value = '';
		sending = true;
		sendButton.disabled = true;
		conversation.push({ role: 'user', content: text });
		appendMessage('user', text, false);
		setTyping(true);

		try {
			var response = await fetch('assets/api/assistant.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
				credentials: 'same-origin',
				body: JSON.stringify({ messages: conversation.slice(-8) })
			});
			var responseText = await response.text();
			var result;
			try {
				result = responseText ? JSON.parse(responseText) : {};
			} catch (parseError) {
				if (/<\?php|alhez_assistant_respond/.test(responseText)) {
					throw new Error('This preview server is serving PHP as plain text. Run the site through a PHP server to use the assistant.');
				}
				throw new Error('The assistant service is temporarily unavailable. Please try again shortly or contact contact@alhez.co.tz.');
			}
			setTyping(false);
			var answer = result.answer;
			if (!answer && result.choices && result.choices[0] && result.choices[0].message) {
				answer = result.choices[0].message.content;
			}
			if (!answer && result.message && typeof result.message === 'string') {
				answer = result.message;
			}
			if (!response.ok || !answer) {
				if (!response.ok) console.warn('ALHEZ assistant endpoint returned HTTP ' + response.status + '.');
				else console.warn('ALHEZ assistant endpoint returned JSON without an answer field.');
				throw new Error(result.error || 'The assistant service did not return a reply. Please try again shortly or contact contact@alhez.co.tz.');
			}
			conversation.push({ role: 'assistant', content: answer });
			appendMessage('assistant', answer, false);
			suggestions.hidden = true;
		} catch (error) {
			setTyping(false);
			var message = error instanceof TypeError
				? 'The assistant could not connect. Please try again shortly or contact contact@alhez.co.tz.'
				: (error.message || 'The assistant is unavailable right now. Please email contact@alhez.co.tz or call +255 757 382 236.');
			appendMessage('assistant', message, true);
		} finally {
			sending = false;
			sendButton.disabled = false;
			input.focus();
		}
	}

	launch.addEventListener('click', function () { setOpen(panel.hidden); });
	closeButton.addEventListener('click', function () { setOpen(false); });
	form.addEventListener('submit', function (event) {
		event.preventDefault();
		sendMessage(input.value);
	});
	root.querySelectorAll('[data-assistant-prompt]').forEach(function (button) {
		button.addEventListener('click', function () { sendMessage(button.getAttribute('data-assistant-prompt')); });
	});
	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape' && !panel.hidden) setOpen(false);
	});
	document.addEventListener('click', function (event) {
		if (!panel.hidden && !root.contains(event.target)) setOpen(false);
	});
}());
