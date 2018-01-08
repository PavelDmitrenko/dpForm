/// <reference path="dpform.d.ts" />
var dpForm = (function () {
    function dpForm() {
    }
    dpForm.prototype.Serialize = function () {
        return this._window.Serialize();
    };
    dpForm.prototype._Save = function () {
        var _this = this;
        //let postedData =(this.GetSaveParams());
        var postedData = JSON.stringify(this.GetSaveParams());
        console.log(postedData);
        $.ajax({
            type: "POST",
            url: this._options.Paths.SaveUrl,
            data: postedData,
            contentType: "application/json;charset=utf-8"
        }).fail(function (xhr, status, error) {
            alert(xhr.responseText);
        })
            .done(function (res) {
            if (_this._options.Events
                && _this._options.Events.OnAfterSave)
                _this._options.Events.OnAfterSave(res);
            _this._window.Close();
        });
    };
    dpForm.prototype.Init = function (options) {
        this._options = options;
    };
    dpForm.prototype.Show = function () {
        var _this = this;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        this._window = new dpWindow();
        this._window.Show({
            id: this._options.FormName,
            content: {
                url: this._options.Paths.FormUrl + "/" + this.GetLoadParams()
            },
            closeSelectors: "#CancelBut",
            onLoaded: function (wnd) {
                _this._OnWindowLoad();
            },
            size: this._options.Size
        });
    };
    dpForm.prototype._OnWindowLoad = function () {
        var _this = this;
        var saveButton = this._window.Content.find(this._options.SaveButton);
        saveButton.on("click", function () {
            _this._Save();
        });
    };
    return dpForm;
}());
//# sourceMappingURL=dpForm.js.map