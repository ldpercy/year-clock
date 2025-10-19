/* HTMLApp
*/
ldpercy.HTMLApp = class {

	name = 'HTMLApp';
	info = 'HTMLApp by ldpercy';

	eventListeners = [
		/* Example instance setup:
		{
			query: '#myForm',
			type: 'change',
			listener: ()=>this.formChangeListener
		},
		{
			query: '#myButton',
			type: 'click',
			listener: ()=>this.buttonClickListener
		},
		*/
	];


	constructor() {
		document.addEventListener('DOMContentLoaded', this.documentDOMContentLoaded.bind(this));
		// adding a `.bind(this)` to the addEventListener gives the listener the instance 'this'
	}


	documentDOMContentLoaded() {
		console.info(this.info);
		this.addEventListeners();
	}


	/* addEventListeners
	*/
	addEventListeners() {
		this.eventListeners.forEach(
			(item) => {
				if (item.element) {
					item.element.addEventListener(
						item.type,
						item.listener.bind(this)
					);
				} else if (item.query) {
					document.querySelectorAll(item.query).forEach((node) => {
						//console.debug('HTMLApp.addEventListeners item.listener', item.listener);
						node.addEventListener(
							item.type,
							item.listener.bind(this)
						);//addEventListener
					});
				}


			}//item
		);
	}/* addEventListeners */



	/* replaceScript
	*/
	replaceScript(id, scriptUrl, callback) {
		//log(`replaceScript: ${id} ${scriptUrl} ${callback}`);
		let scriptElement = document.createElement('script');

		scriptElement.setAttribute('id', id);
		scriptElement.setAttribute('src', scriptUrl);
		scriptElement.addEventListener('load', callback);

		document.getElementById(id).remove();
		document.getElementsByTagName('head')[0].appendChild(scriptElement);
	}/* replaceScript */



	/* getUrlParameter
	*/
	getUrlParameter(name)
	{
		return (new URL(window.location)).searchParams.get(name);
	}


}/* HTMLApp */