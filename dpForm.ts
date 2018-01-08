/// <reference path="dpform.d.ts" />


abstract class dpForm implements IDpForm
{
	private _window: dpWindow;
	private _options: IDpFormOptions;
	private _data: string[];

	abstract GetLoadParams(): string;
	abstract GetSaveParams(): any;

	public Serialize() {
		return this._window.Serialize();
	}

	private _Save() {

		//let postedData =(this.GetSaveParams());
		let postedData = JSON.stringify(this.GetSaveParams());
		console.log(postedData);

		$.ajax({
				type: "POST",
				url: this._options.Paths.SaveUrl,
				data: postedData,
				contentType: "application/json;charset=utf-8"
			}).fail((xhr, status, error) => {
				alert(xhr.responseText);
			})
			.done((res) =>
			{

				if (this._options.Events
					&& this._options.Events.OnAfterSave)
					this._options.Events.OnAfterSave(res);

				this._window.Close();
			});
	}

	protected Init(options: IDpFormOptions) {
		this._options = options;
	}

	public Show(...data:any[]) {
	
		this._window = new dpWindow();
		
		this._window.Show({

			id: this._options.FormName,

			content: {
				url: `${this._options.Paths.FormUrl}/${this.GetLoadParams()}`
			},

			closeSelectors: "#CancelBut",

			onLoaded: (wnd) => {
				this._OnWindowLoad();
			},

			size: this._options.Size
		});
	}

	private _OnWindowLoad() {
		const saveButton = this._window.Content.find(this._options.SaveButton);

		saveButton.on("click", () => {
			this._Save();
		});
	}

}