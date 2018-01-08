


interface IDpForm {
	Show(dataID: number | string): void;
}

interface IDpFormOptions {
	Paths: IDpFormOptionsUrl;
	Size: IDPWClientSize;
	FormName: string;
	SaveButton: string;
	Events?: IDpFormOptionsEvents;
}

interface IDpFormOptionsEvents {
	OnAfterSave?(data:any): void;
}



interface IDpFormOptionsUrl {
	FormUrl: string;
	SaveUrl: string;
}

