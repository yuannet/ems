$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function encapsulateFormEvent() {
    var _submission = new Object();

    _submission.eventId     = $("#eventId").val();
    _submission.sn          = $("#sn").val();
    _submission.is_active   = $("#is_active").val();
    _submission.action      = $("#action").val();
    _submission.createdBy   = $("#created_by").val();
    _submission.page_id     = $("#page_id").val();

    _submission.userId      = $("#userId").val();
    _submission.userGroup   = $("#userGroup").val();
    _submission.status_id   = $("#status_id").val();
    _submission.is_adendum  = $("#is_adendum").val();
    _submission.is_adendum_in_progress = $("#is_adendum_in_progress").val();
    _submission.original_document_id = $("#original_document_id").val();
    _submission.create_adendum = $("#create_adendum").val();
    _submission.reason_of_change = typeof ($("#txtReasonOfChange").val()) === "undefined" ? "" : $("#txtReasonOfChange").val();

    if (String(_submission.status_id).toLowerCase() == "approved") {
        _submission.sendSWTWNotification = ($('#SWTWNotification').is(':checked') == true) ? 1 : 0;
        _submission.sendSWTWICGNotification = ($('#SWTWICGNotification').is(':checked') == true) ? 1 : 0;
    } else {
        _submission.sendSWTWNotification = 0;
        _submission.sendSWTWICGNotification = 0;
    }
    
    _submission.logo        = $("#fileLogo").val();
    _submission.manager     = $("#cboManager").val();
    _submission.title       = $("#txtTitle").val();
    _submission.description = $("#txtDescription").val();
    _submission.startDate   = $("#txtStartDate").val();
    _submission.endDate     = $("#txtEndDate").val();
    _submission.cutOff      = $("#txtCutOffDate").val();
    _submission.officeType  = $("#cboOfficeType").val();
    _submission.country     = $("#cboCountry").val();
    _submission.city        = $("#cboCity").val();
    _submission.otherCity   = $("#cboOtherCity").val();
    _submission.venue       = $("#txtVenue").val();
    _submission.eventType   = $('input[name=eventType]:checked').val();
    _submission.eventType   = typeof (_submission.eventType) === "undefined" ? "" : _submission.eventType;

    _submission.is_hr_related       = ($('#is_hr_related').is(':checked') == true) ? 1 : 0;
    _submission.is_project_related  = ($('#is_project_related').is(':checked') == true) ? 1 : 0;

    _submission.organizer   = $("#txtOrganizer").val();
    _submission.website     = $("#txtWebsite").val();
    _submission.totalFunding= $("#txtTotalFunding").val();

    /* --ICG Involvement-- */
    /* promotion */
    _submission.is_icg_promotion = ($('#is_icg_promotion').is(':checked') == true) ? 1 : 0;
    _submission.is_icg_promotion_blogger = ($('#is_icg_promotion_blogger').is(':checked') == true) ? 1 : 0;
    _submission.icg_promotion_blogger_notes = $("#icg_promotion_blogger_notes").val();
    _submission.is_icg_promotion_videographer = ($('#is_icg_promotion_videographer').is(':checked') == true) ? 1 : 0;
    _submission.icg_promotion_videographer_notes = $("#icg_promotion_videographer_notes").val();
    _submission.is_icg_promotion_marketing_email = ($('#is_icg_promotion_marketing_email').is(':checked') == true) ? 1 : 0;
    _submission.icg_promotion_marketing_email_notes = $("#icg_promotion_marketing_email_notes").val();
    _submission.is_icg_promotion_flyers = ($('#is_icg_promotion_flyers').is(':checked') == true) ? 1 : 0;
    _submission.icg_promotion_flyers_notes = $("#icg_promotion_flyers_notes").val();
    _submission.is_icg_promotion_others = ($('#is_icg_promotion_others').is(':checked') == true) ? 1 : 0;
    _submission.icg_promotion_others_notes = $("#icg_promotion_others_notes").val();

    /* organizer */
    _submission.is_icg_organizer = ($('#is_icg_organizer').is(':checked') == true) ? 1 : 0;
    _submission.is_icg_event_organizer_logistic = ($('#is_icg_event_organizer_logistic').is(':checked') == true) ? 1 : 0;
    _submission.icg_event_organizer_logistic_notes = $("#icg_event_organizer_logistic_notes").val();
    _submission.is_icg_event_organizer_others = ($('#is_icg_event_organizer_others').is(':checked') == true) ? 1 : 0;
    _submission.icg_event_organizer_others_notes = $("#icg_event_organizer_others_notes").val();

    /* publication */
    _submission.is_icg_publication = ($('#is_icg_publication').is(':checked') == true) ? 1 : 0;
    _submission.is_icg_publication_list_of_relevant = ($('#is_icg_publication_list_of_relevant').is(':checked') == true) ? 1 : 0;
    _submission.icg_publication_list_of_relevant_notes = $("#icg_publication_list_of_relevant_notes").val();
    _submission.is_icg_publication_dissemination = ($('#is_icg_publication_dissemination').is(':checked') == true) ? 1 : 0;
    _submission.icg_publication_dissemination_notes = $("#icg_publication_dissemination_notes").val();
    _submission.is_icg_publication_others = ($('#is_icg_publication_others').is(':checked') == true) ? 1 : 0;
    _submission.icg_publication_others_notes = $("#icg_publication_others_notes").val();

    /* multimedia */
    _submission.is_icg_multimedia = ($('#is_icg_multimedia').is(':checked') == true) ? 1 : 0;
    _submission.is_icg_multimedia_website = ($('#is_icg_multimedia_website').is(':checked') == true) ? 1 : 0;
    _submission.icg_multimedia_website_notes = $("#icg_multimedia_website_notes").val();
    _submission.is_icg_multimedia_printing = ($('#is_icg_multimedia_printing').is(':checked') == true) ? 1 : 0;
    _submission.icg_multimedia_printing_notes = $("#icg_multimedia_printing_notes").val();
    _submission.is_icg_multimedia_design = ($('#is_icg_multimedia_design').is(':checked') == true) ? 1 : 0;
    _submission.icg_multimedia_design_notes = $("#icg_multimedia_design_notes").val();
    _submission.is_icg_multimedia_others = ($('#is_icg_multimedia_others').is(':checked') == true) ? 1 : 0;
    _submission.icg_multimedia_others_notes = $("#icg_multimedia_others_notes").val();

    _submission.event_category = $("#cboEventCategory").val();
    _submission.is_high_profile_event = $("#cboHighProfileEvent").val();
    _submission.icg_focal_point = $("#cboFocalPoint").val();

    _submission.is_dg_keynote_speaker   = ($('#is_dg_keynote_speaker').is(':checked') == true) ? 1 : 0;
    _submission.is_dg_speaker           = ($('#is_dg_speaker').is(':checked') == true) ? 1 : 0;
    _submission.is_dg_opening_closing_remarks = ($('#is_dg_opening_closing_remarks').is(':checked') == true) ? 1 : 0;
    _submission.is_dg_others            = ($('#is_dg_others').is(':checked') == true) ? 1 : 0;
    _submission.DGOthers = $("#txtDGOthers").val();
    _submission.is_capacity_building = ($('#is_capacity_building').is(':checked') == true) ? 1 : 0;
    /*if (_submission.DGOthers == "") {
        _submission.is_dg_others = 0
    }*/

    _submission.remark      = $("#txtRemark").val();
    _submission.comment     = $("#txtComment").val() + ' ' + _submission.reason_of_change;
    _submission.commentFile = typeof ($("#fileReasonOfChange").val()) === "undefined" ? "" : $("#fileReasonOfChange").val();

    var jointArray = new Array();
    var i = 0;
    $("#tblPartner tbody tr").each(function () {
        var rowId = $(this).attr("id");
        var joint = new Object();
        joint.rec_id        = $("#" + rowId + " input[name='joint_rec_id']").val();
        joint.partner_id    = $("#" + rowId + " .joint_institution_id").val();
        joint.role          = $("#" + rowId + " .joint_role").val();
        jointArray[i]       = joint;
        i++;
    });

    var projectArray = new Array();
    var i = 0;
    $("#tblProject tbody tr").each(function () {
        var rowId = $(this).attr("id");
        var project = new Object();
        project.rec_id      = $("#" + rowId + " input[name='project_rec_id']").val();
        project.project_id  = $("#" + rowId + " .project_id").val();
        projectArray[i]     = project;
        i++;
    });

    var eventRelatedArray = new Array();
    var i = 0;
    $("#tblEventRelated tbody tr").each(function () {
        var rowId = $(this).attr("id");
        var eventRelated = new Object();
        eventRelated.rec_id     = $("#" + rowId + " input[name='event_rec_id']").val();
        eventRelated.event_type = $("#" + rowId + " input[name='event_type']").val();
        eventRelated.event_id   = $("#" + rowId + " input[name='event_id']").val();
        eventRelated.event_name = $("#" + rowId + " input[name='event_name']").val();
        eventRelated.event_manager = $("#" + rowId + " input[name='event_manager']").val();
        eventRelated.event_website = $("#" + rowId + " input[name='event_website']").val();
        eventRelated.event_venue = $("#" + rowId + " input[name='event_venue']").val();
        eventRelated.event_startDate = $("#" + rowId + " input[name='event_startDate']").val();
        eventRelated.event_endDate = $("#" + rowId + " input[name='event_endDate']").val();

        eventRelated.rec_id = typeof (eventRelated.rec_id) === "undefined" ? "" : eventRelated.rec_id;
        eventRelated.event_type = typeof (eventRelated.event_type) === "undefined" ? "" : eventRelated.event_type;
        eventRelated.event_id = typeof (eventRelated.event_id) === "undefined" ? "" : eventRelated.event_id;
        eventRelated.event_name = typeof (eventRelated.event_name) === "undefined" ? "" : eventRelated.event_name;
        eventRelated.event_website = typeof (eventRelated.event_website) === "undefined" ? "" : eventRelated.event_website;
        eventRelated.event_venue = typeof (eventRelated.event_venue) === "undefined" ? "" : eventRelated.event_venue;
        eventRelated.event_startDate = typeof (eventRelated.event_startDate) === "undefined" ? "" : eventRelated.event_startDate;
        eventRelated.event_endDate = typeof (eventRelated.event_endDate) === "undefined" ? "" : eventRelated.event_endDate;

        eventRelatedArray[i] = eventRelated;
        i++;
    });

    var suppDocArray = new Array();
    var i = 0;
    $("#tblSuppDoc tbody tr").each(function () {
        var rowId = $(this).attr("id");
        var suppDoc = new Object();
        suppDoc.rec_id      = $("#" + rowId + " input[name='suppDoc_rec_id']").val();
        suppDoc.description = $("#" + rowId + " input[name='suppDoc_desc']").val();
        suppDoc.fileName    = $("#" + rowId + " input[name='suppDoc_name']").val();
        suppDoc.docType     = $("#" + rowId + " .suppDoc_type").val();
        if (suppDoc.fileName != "" && suppDoc.fileName != null) {
            suppDocArray[i] = suppDoc;
            i++;
        }
    });

    var bloggerArray = new Array();
    var i = 0;
    $("#tblBlogger tbody tr").each(function () {
        var rowId = $(this).attr("id");
        var blogger = new Object();
        blogger.rec_id  = $("#" + rowId + " input[name='contact_rec_id']").val();
        blogger.name    = $("#" + rowId + " input[name='contact_name']").val();
        blogger.email   = $("#" + rowId + " input[name='contact_email']").val();
        blogger.im_type = $("#" + rowId + " .contact_im_type").val();
        blogger.im_account = $("#" + rowId + " input[name='contact_im_account']").val();
        bloggerArray[i] = blogger;
        i++;
    });

    var videographerArray = new Array();
    var i = 0;
    $("#tblVideographer tbody tr").each(function () {
        var rowId = $(this).attr("id");
        var videographer = new Object();
        videographer.rec_id     = $("#" + rowId + " input[name='contact_rec_id']").val();
        videographer.name       = $("#" + rowId + " input[name='contact_name']").val();
        videographer.email      = $("#" + rowId + " input[name='contact_email']").val();
        videographer.im_type    = $("#" + rowId + " .contact_im_type").val();
        videographer.im_account = $("#" + rowId + " input[name='contact_im_account']").val();
        videographerArray[i] = videographer;
        i++;
    });

    var publicationArray = new Array();
    var i = 0;
    $("#tblPublication tbody tr").each(function () {
        var rowId = $(this).attr("id");
        var publication = new Object();
        publication.rec_id      = $("#" + rowId + " input[name='publication_rec_id']").val();
        publication.description = $("#" + rowId + " input[name='publication_desc']").val();
        publication.fileName    = $("#" + rowId + " input[name='publication_name']").val();
        publicationArray[i] = publication;
        i++;
    });

    var deletedIdArray = new Array();
    var i = 0;
    $("#tblDeletedId tbody tr").each(function () {
        var rowId = $(this).attr("id");
        var deletedId = new Object();
        deletedId.rec_id = $("#" + rowId + " input[name='delete_table_id']").val();
        deletedId.table_name = $("#" + rowId + " input[name='delete_table_name']").val();
        deletedIdArray[i] = deletedId;
        i++;
    });

    _submission.jointDetails = jointArray;
    _submission.projectDetails = projectArray;
    _submission.eventRelatedDetails = eventRelatedArray;
    _submission.suppDocDetails = suppDocArray;

    _submission.bloggerDetails = bloggerArray;
    _submission.videographerDetails = videographerArray;
    _submission.publicationDetails = publicationArray;
    _submission.deletedIdDetails = deletedIdArray;

    var Submission = { "submission": JSON.stringify(_submission) };
    
    return Submission;
}

function populateComboBox(selector, data, columnOption, defaultValue) {
    columnOption = typeof (columnOption) !== "undefined" ? columnOption : "";
    defaultValue = typeof (columnOption) !== "undefined" ? defaultValue : false;

    if (columnOption != "") {
        key = columnOption["key"];
        option = "option";
        text = columnOption["text"];
    } else {
        key = "key";
        option = "option";
        text = "text";
    }

    $(selector).empty();

    var optionIns = "";
    if (defaultValue) {
        optionIns = $("<option value='0'></option>");
        $(selector).append(optionIns)
    }

    $.each(data, function (i, item) {
        if (item[key] != "") {
            optionIns = $("<option value=\"" + item[key] + "\" " + (item[option] == null ? "" : item[option]) + ">" + item[text] + "</option>");
            $(selector).append(optionIns);
        }
    });
    $(selector).trigger("chosen:updated");
}

function readURL(input, _image, _canvas, _context, _width, _height) {
    if (input.files && input.files[0]) {
        var fileType = input.files[0].type;
        var x = fileType.split("/");
        var ext = x[1].toLowerCase();
        ext = ext;
        if (ext == 'bmp' || ext == 'jpg' || ext == 'jpeg' || ext == 'gif' || ext == 'png') {
            var reader = new FileReader();

            reader.onload = function (e) {
                _image.src = e.target.result;
                if (_image.width <= 80 || _image.height <= 80) {
                    alert('Please select an image with minimum size 80x80 pixel');
                    input.value = '';
                } else {
                    _canvas.width = _width;
                    _canvas.height = _height;
                    _context.drawImage(imageLogo, 0, 0, _width, _height);
                }
            }

            reader.readAsDataURL(input.files[0]);
        } else {
            alert('Please select an image file');
            input.value = '';
            _context.clearRect(0, 0, _width, _height);
        }
    }
}

$(document).on("focus", ".number", function () {
    $(this).val(delCommas($(this).val()));
});

$(document).on("blur", ".number", function () {
    $(this).val(accounting.formatNumber($(this).val(), 2));
});

function delCommas(str) {
    str = String(str);
    str = str.replace(/\,/g, "");
    return (str == "") ? "" : parseFloat(str);
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function createCombobox(_id, _name, _class, _data, _selectedValue, columnOption, defaultValue) {
    $id = "", $name = "", $class = "";
    if (_id != "")
        $id = "id=\"" + _id + "\"";
    if (_name != "")
        $name = "name=\"" + _name + "\"";
    if (_class != "")
        $class = "class=\"" + _class + "\"";

    columnOption = typeof (columnOption) !== "undefined" ? columnOption : "";
    defaultValue = typeof (defaultValue) !== "undefined" ? defaultValue : false;

    if (columnOption != "") {
        key = columnOption["key"];
        text = columnOption["text"];
    } else {
        key = "key";
        text = "text";
    }

    $strOut = "<select " + $id + " " + $name + " " + $class + " >";
    if (defaultValue) {
        $strOut += "<option value=\"0\"></option>";
    }

    $.each(_data, function (i, item) {
        $option = "";
        if (_selectedValue == item[key]) {
            $option = "selected";
        }
        $strOut += "<option value=\"" + item[key] + "\" " + $option + ">" + item[text] + "</option>";
    })

    $strOut += "</select>";
    return $strOut;
}

function deleteTableRowId(formObj, tableName, recId) {
    tableName = typeof(tableName)!=="undefined"?tableName:"";
    recId = typeof(recId)!=="undefined"?recId:"";

    if (recId != "" && tableName != "") {
        var db_table = "";
        switch (String(tableName).toLowerCase()) { 
            case "tblpartner" :
                db_table = "EventManagementPartner";
                break;
            case "tblproject" :
                db_table = "EventManagementRelatedProject";
                break;
            case "tbleventrelated" :
                db_table = "EventManagementChains";
                break;
            case "tblsuppdoc" :
                db_table = "Attachment";
                break;
            case "tblblogger" :
                db_table = "EventManagementPromotionContact";
                break;
            case "tblvideographer" :
                db_table = "EventManagementPromotionContact";
                break;
            case "tblpublication" :
                db_table = "Attachment";
                break;
        }

        $uuid = guid();
        $strOutput = "<tr id=\"" + $uuid + "\">"+
                    "<td><input type='hidden' name='delete_table_name' value='" + db_table + "' /></td>"+
                    "<td><input type='hidden' name='delete_table_id' value='" + recId + "' /></td>"+
                    "</tr>";
        $(formObj).append($strOutput)
        return true;
    }
    return false;

}

function openInstitutionDetail(id) {
    if (id != "" && id != "0") {
        link = "https://my.cifor.org/PMSv2/LoAFunder/pages/ViewInstitution.aspx?id=" + id;
        //window.open(link, "_blank", "toolbar=no, scrollbars=yes, resizable=yes, top=0, left=10, width=960, height=600");
        parent.ShowCustomPopUp(link);
    }
}

function openProjectDetail(id) {
    if (id != "" && id != "0") {
        link = getUrl("home_url")+"/PMSv2/ProjectTracking/view/Detail.aspx?id=" + id;
        //window.open(link, "_blank", "toolbar=no, scrollbars=yes, resizable=yes, top=0, left=10, width=960, height=600");
        parent.ShowCustomPopUp(link);
    }
}

function openEventDetail(id) {
    if (id != "" && id != "0") {
        link = "detail.aspx?id=" + id+"&blankmode=1";
        //window.open(link, "_blank", "toolbar=no, scrollbars=yes, resizable=yes, top=0, left=10");
        parent.ShowCustomPopUp(link);
    }
}

function dateValid(strDate) {
    //var rxDatePattern = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/;
    var rxDatePattern = /^(([0-9])|([0-2][0-9])|([3][0-1]))\ (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\ \d{4}$/;
    var validArr = strDate.match(rxDatePattern);
    return (validArr == null) ? false : true;
}

function leaveDateCompare(selector1,selector2) {
    var startDate = new Date($(selector1).val());
    var endDate = new Date($(selector2).val());

    if (startDate > endDate) return "1";
    else if (startDate < endDate) return "2";
}

function getCutoffDate(startDate) {
    /*var d = new Date(startDate);
    d.setDate(d.getDate() - 1);*/
    var cutoffDate = new Date();
    if (startDate != "") {
        var obj = {};
        obj.eventDate = startDate;
        $.ajax({
            type: "POST",
            url: "/Workspace/WebGeneral/EventMethod.aspx/getCutoffDate",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (r) {
                cutoffDate= new Date(r.d);
            }
        });
    }
    //console.log(cutoffDate);
    return cutoffDate;
}

function getUrl(type) {
    var url = "";
    switch (type) {
        case "home_url":
            url = $("#home_url").val();
            break;
        case "App_Home_Url":
            url = $("#App_Home_Url").val();
            break;
        case "my_tasklist_url":
            url = $("#my_tasklist_url").val();
            break;
        case "my_submission_url":
            url = $("#my_submission_url").val();
            break;
        default:
            break;
    }
    return url;
}

function PreventBackBrowser() {
    $(document).on("keydown", function (e) {
        if (e.which === 8 && !$(e.target).is("input, textarea")) {
            e.preventDefault();
        }
    });
}

$(document).ready(function () {
    PreventBackBrowser();
});

$(document).on("click", "#btnClose", function () {
    top.window.location = getUrl("my_tasklist_url");
})

function checkValidFileName() {
    var err = 0;
    var errMsg = "";
    $("input[type='file']").each(function () {
        if (!IsValidFileName(this)) {
            if (err == 0) {
                errMsg = "<br> - Filename cannot contain any of the following character(s): \\ / : * ? \" < > | # & '";
            }
            err++;
        }
    });
    return errMsg;
}

function IsValidFileName(selector) {
    result = true;
    var fullPath = $(selector).val();
    if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        var patternStr = /(#|&|')/g;
        var result = filename.match(patternStr);

        result = result == null ? true : false;
    }
    return result;
}