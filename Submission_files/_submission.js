var page_id = typeof ($("#page_id").val()) === "undefined" ? "" : $("#page_id").val();

function validation(data) {
    var errorMsg = "";
    var data = JSON.parse(data.submission);


    if ((data.create_adendum == "1" || data.is_adendum == "1") && data.reason_of_change == "" && (String(data.status_id).toLowerCase() == "draft" || String(data.status_id).toLowerCase() == "approved")) {
        errorMsg += "<br> - Reason of revision is required";
    }

    if (data.title == "") {
        errorMsg += "<br> - Event name is required";
    }

    if (data.logo != "") {
        var filename = data.logo;
        var x = filename.split(".");
        var file_ext = String(x[x.length - 1]).toLowerCase();
        if (file_ext != "jpg" && file_ext != "jpeg" && file_ext != "bmp" && file_ext != "png" && file_ext != "gif") {
            errorMsg += "<br> - Logo must be image file";
        }
    }

    if (data.manager == "" || data.manager == "0") {
        errorMsg += "<br> - Event manager is required";
    }

    if (data.description == "") {
        errorMsg += "<br> - Description is required";
    }

    if (data.startDate == "" || data.endDate == "") {
        errorMsg += "<br> - Event date is required";
    }

    if (!dateValid(data.startDate) || !dateValid(data.endDate)) {
        errorMsg += "<br> - Invalid event date format";
    }

    if (data.cutOff == "") {
        errorMsg += "<br> - Cutoff date of registration is required";
    }

    if (!dateValid(data.cutOff)) {
        errorMsg += "<br> - Invalid cutoff date of registration format";
    }

    if (data.officeType == "" || data.officeType == "0"
        || data.country == "" || data.country == "0"
        || data.city == "" || data.city == "0") {
        errorMsg += "<br> - Location is required";
    }

    if (String($("#cboCity option[value='" + data.city + "']").text()).trim().toLowerCase() == "elsewhere") {
        if (data.otherCity == "") {
            errorMsg += "<br> - Please specify the city";
        }
    }

    if (data.eventType == "" || data.eventType == "0") {
        errorMsg += "<br> - Event type is required";
    }

    if (data.eventType == "3" || data.eventType == "4" ) {
        var jointName = data.evenType == "3" ? "Institution" : "Funder";
        var countJ = 0;
        var countNm = 0;
        var countRl = 0;
        var arrpartnerNm = "";
        var partnerNm = "";
        var arrpartnerRl = "";
        var partnerRl = "";
        $.each(data.jointDetails, function (i, item) {
            if (item.partner_id != 0 && item.partner_id != null) {
                var partnerCurr = String(item.partner_id);
                arrpartnerNm = arrpartnerNm + ',' + partnerCurr;

                partnerNm = arrpartnerNm.match(RegExp(partnerCurr, 'g'));
                if (partnerNm.length > 1) {
                    if (countJ == 0) {
                        errorMsg += "<br> - Cannot add same "+ jointName.toLowerCase();
                        countJ = 1;
                    }
                }
            }
            else {
                if (countNm == 0) {
                    errorMsg += "<br> - "+jointName+" name cannot be empty";
                    countNm = 1;
                }
            }

            if (item.role != 0 && item.role != null) {
                var partnerCurr = String(item.role);
                arrpartnerRl = arrpartnerRl + ',' + partnerCurr;
            }
            else {
                if (countRl == 0) {
                    errorMsg += "<br> - "+jointName+" role cannot be empty";
                    countRl = 1;
                }
            }
        });
        partnerRl = arrpartnerRl.match(RegExp('1', 'g'));
        if (partnerRl != null || partnerRl != undefined) {
            if (partnerRl.length > 1) {
                errorMsg += "<br> - Cannot set leader for more than once at "+ jointName.toLowerCase();
            }
            /*else if (partnerRl.length = 0) {
            errorMsg += "<br> - Leader is required at partner institution";
            }*/
        }
        /*else {
        errorMsg += "<br> - Leader is required at partner institution";
        }*/
        if (data.eventType == "4" && data.jointDetails.length == 0) {
            errorMsg += "<br> - "+jointName+" is required";
        }
    }

    if (data.is_project_related == "1") {
        var countP = 0;
        var countPnm = 0;
        var arrprojectNm = "";
        var projectNm = "";
        $.each(data.projectDetails, function (i, item) {
            if (item.project_id != 0 && item.project_id != null) {
                var projectCurr = String(item.project_id);
                arrprojectNm = arrprojectNm + ',' + projectCurr;

                projectNm = arrprojectNm.match(RegExp(projectCurr, 'g'));
                if (projectNm.length > 1) {
                    if (countP == 0) {
                        errorMsg += "<br> - Cannot add same project";
                        countP = 1;
                    }
                }
            }
            else {
                if (countPnm == 0) {
                    errorMsg += "<br> - Project name cannot be empty";
                    countPnm = 1;
                }
            }
        });
    }

    if (data.organizer == "") {
        errorMsg += "<br> - Organizer is required";
    }

    if (data.totalFunding != "") {
        var funding = delCommas(data.totalFunding);
        if (String(funding).length > 13) {
            errorMsg += "<br> - Estimated event cost is too big";
        }
    }

    if (data.is_dg_others == "1" && data.DGOthers == "") {
        errorMsg += "<br> - Please specify others DG involvement";
    }


    /* related registered event */
    var countE = 0;
    var countEnm = 0;
    var arreventNm = "";
    var eventNm = "";
    $.each(data.eventRelatedDetails, function (i, item) {
        if (item.event_id != 0 && item.event_id != null && item.event_id != "") {
            var eventCurr = String(item.event_id);
            arreventNm = arreventNm + ',' + eventCurr;

            eventNm = arreventNm.match(RegExp(eventCurr, 'g'));
            if (eventNm != null) {
                if (eventNm.length > 1) {
                    if (countE == 0) {
                        errorMsg += "<br> - Cannot add same related event";
                        countE = 1;
                    }
                }
            }
        }
        else {
            if (countEnm == 0 && (item.event_name == "")) {
                // || item.event_venue == "" || item.event_startDate == "" || item.event_endDate == "")) {
                errorMsg += "<br> - Related event information cannot be empty";
                countEnm = 1;
            }
        }
    });

    /* related non-registered event */
    var countE = 0;
    var countEnm = 0;
    var arreventNm = "";
    var eventNm = "";
    $.each(data.eventRelatedDetails, function (i, item) {
        if (item.event_id == null || item.event_id == "") {
            var eventCurr = String(item.event_name);
            if (eventCurr != "") {
                arreventNm = arreventNm + ',' + eventCurr.trim();

                eventNm = arreventNm.match(RegExp(eventCurr, 'g'));
                if (eventNm != null) {
                    if (eventNm.length > 1) {
                        if (countE == 0) {
                            errorMsg += "<br> - Cannot add same related event";
                            countE = 1;
                        }
                    }
                }
            }
        }
    });

    /* supporting document */
    var countSD = 0;
    $.each(data.suppDocDetails, function (i, item) {
        if (item.description == null || item.description == "") {
            if (countSD == 0) {
                errorMsg += "<br> - Supporting document description is required";
                countSD = 1;
            }
        }
    });

    var page_id = $("#page_id").val();
    if (page_id == "verification") {
        var count_icg = 0;
        count_icg += parseInt(data.is_icg_promotion);
        count_icg += parseInt(data.is_icg_organizer);
        count_icg += parseInt(data.is_icg_publication);
        count_icg += parseInt(data.is_icg_multimedia);

        if (count_icg > 0) {
            if ((data.icg_focal_point == "" || data.icg_focal_point == "0") && String($("#isRD").val()).toLowerCase()!="true") {
                errorMsg += "<br> - COE focal point is required";
            }

            if (data.is_icg_promotion_others == 1 && data.icg_promotion_others_notes == "") {
                errorMsg += "<br> - Please specify others outreach & promotion notes";
            }

            if (data.is_icg_event_organizer_others == 1 && data.icg_event_organizer_others_notes == "") {
                errorMsg += "<br> - Please specify others event logistic/organizer notes";
            }

            if (data.is_icg_publication_others == 1 && data.icg_publication_others_notes == "") {
                errorMsg += "<br> - Please specify others publications notes";
            }

            if (data.is_icg_multimedia_others == 1 && data.icg_multimedia_others_notes == "") {
                errorMsg += "<br> - Please specify others multimedia notes";
            }

            var countPD = 0;
            $.each(data.publicationDetails, function (i, item) {
                if (item.description == null || item.description == "") {
                    if (countPD == 0) {
                        errorMsg += "<br> - Publication document description is required";
                        countPD = 1;
                    }
                }
            });
        }
    }

    /* cek valid filename */
    errorMsg += checkValidFileName();
    return errorMsg;
}

function populateInstitution(id, institutionId, institutionName, roleId, roleName) {
    var _eventType = $('input[name=eventType]:checked').val();
    var partnerText = "";
    if (_eventType == "4") {
        partnerText = "funder";
    } else {
        partnerText = "institution";
    }
    partnerText = "institution";
    outputData = addInstitution(id, institutionId, institutionName, roleId, roleName);
    var rowID = $(outputData).closest("tr").attr("id");
    $('#tblPartner tbody').append(outputData);
    var rec_id = $('#' + rowID + ' input[name="joint_rec_id"]').val();
    $('#' + rowID + ' .joint_institution_id').ajaxChosen({
        dataType: 'json',
        type: 'POST',
        url: "EventServices.aspx",
        data: { action: "getInstitution", eventType: '0' }
    }, { minLength: 3 }, { placeholder_text_single: "Please select "+partnerText+"...", search_contains: true, width: "60%" })
    .on("chosen:showing_dropdown", function () {
        _oldVal = this.value;
    }).on("change", function (evt, params) {
        if (page_id == "verification" && rec_id != "") { changeChosen(this, evt, params, _oldVal); }

        if (this.value != "") {
            $('#' + rowID + ' .btnDetail').show();
        } else {
            $('#' + rowID + ' .btnDetail').hide();
        }
    });

    $('#' + rowID + ' .joint_role').chosen({ placeholder_text_single: "Please select "+partnerText+" role...", width: "95%" })
    .on("chosen:showing_dropdown", function () {
        _oldVal = this.value;
    }).on("change", function (evt, params) {
        if (page_id == "verification" && rec_id != "") { changeChosen(this, evt, params, _oldVal); }
    });

    $("#tblPartner td:nth-child(2), #tblPartner th:nth-child(2)").removeClass("hidden");
    if (_eventType == "4") {
        $("#tblPartner td:nth-child(2), #tblPartner th:nth-child(2)").addClass("hidden");
    }
}

function populateProject(id, projectId, projectName) {
    outputData = addProject(id, projectId, projectName);
    var rowID = $(outputData).closest("tr").attr("id");
    $('#tblProject tbody').append(outputData);

    var rec_id = $('#' + rowID + ' input[name="joint_rec_id"]').val();
    $('#' + rowID + ' .project_id').ajaxChosen({
        dataType: 'json',
        type: 'POST',
        url: "EventServices.aspx",
        data: { action: "getProject" }
    }, { minLength: 3 }, { placeholder_text_single: "Please select project...", search_contains: true, width: "60%" })
    .on("chosen:showing_dropdown", function () {
        _oldVal = this.value;
    }).on("change", function (evt, params) {
        if (page_id == "verification" && rec_id != "") { changeChosen(this, evt, params, _oldVal); }

        if (this.value != "") {
            $('#' + rowID + ' .btnDetail').show();
        } else {
            $('#' + rowID + ' .btnDetail').hide();
        }
    });
}

function populateEvent(id, type, eventId, name, manager, website, venue, startDate, endDate) {
    outputData = addEvent(id, type, eventId, name, manager, website, venue, startDate, endDate);
    var rowID = $(outputData).closest("tr").attr("id");
    $('#tblEventRelated tbody').append(outputData);
    var rec_id = $('#' + rowID + ' input[name="event_rec_id"]').val();
    if ($("#" + rowID + " input[name='event_type']").val() == "non-registered") {
        $("#" + rowID + " input[name='event_startDate'],#" + rowID + " input[name='event_endDate']").datepicker({
            format: 'dd M yyyy'
        });

        if (id == "") {
            $("#" + rowID + " input[name='event_startDate']").datepicker('setDate', new Date());
            $("#" + rowID + " input[name='event_endDate']").datepicker('setDate', new Date());
        }

        if (page_id == "verification" && rec_id != "") {
            validateChange("#" + rowID + " input[name='event_name']");
            validateChange("#" + rowID + " input[name='event_manager']");
            validateChange("#" + rowID + " input[name='event_website']");
            validateChange("#" + rowID + " input[name='event_venue']");
            validateChange("#" + rowID + " input[name='event_startDate']");
            validateChange("#" + rowID + " input[name='event_endDate']");
        }
        else if (page_id == "verification") {
            validateChange("#" + rowID + " input[name='event_startDate']");
            validateChange("#" + rowID + " input[name='event_endDate']");
        }
    }
}

function populateSuppDocument(id, fileName, description, type) {
    outputData = addSuppDocument(id, fileName, description, type);
    var rowID = $(outputData).closest("tr").attr("id");
    var page_id = $("#page_id").val();
    $('#tblSuppDoc tbody').append(outputData);
    var rec_id = $('#' + rowID + ' input[name="suppDoc_rec_id"]').val();
    if ($("#" + rowID + " input[name='suppDoc_rec_id']").val() == "" && page_id == "verification") {
        $('#' + rowID + ' .suppDoc_type').chosen({ placeholder_text_single: "Please select type...", width: "95%" })
        .on("chosen:showing_dropdown", function () {
            _oldVal = this.value;
        }).on("change", function (evt, params) {
            if (page_id == "verification" && rec_id != "") { changeChosen(this, evt, params, _oldVal); }
        });
    }

    if (page_id == "verification" && rec_id != "") {
        validateChange("input[name='suppDoc_desc']");
    }
}

function populateBlogger(id, type, name, email, im_type, im_account) {
    outputData = addPromotionContact(id, type, name, email, im_type, im_account);
    var rowID = $(outputData).closest("tr").attr("id");
    $('#tblBlogger tbody').append(outputData);
    $('#' + rowID + ' .contact_im_type').chosen({ placeholder_text_single: "Please select type...", width: "95%" });
    /*.on("chosen:showing_dropdown", function () {
    _oldVal = this.value;
    }).on("change", function (evt, params) {
    if (page_id == "verification") { changeChosen(this, evt, params, _oldVal); }
    });

    if (page_id == "verification") {
    validateChange("#" + rowID + " input[name='contact_name']");
    validateChange("#" + rowID + " input[name='contact_email']");
    validateChange("#" + rowID + " input[name='contact_im_account']");
    }*/
}

function populateVideographer(id, type, name, email, im_type, im_account) {
    outputData = addPromotionContact(id, type, name, email, im_type, im_account);
    var rowID = $(outputData).closest("tr").attr("id");
    $('#tblVideographer tbody').append(outputData);
    $('#' + rowID + ' .contact_im_type').chosen({ placeholder_text_single: "Please select type...", width: "95%" });
    /*.on("chosen:showing_dropdown", function () {
    _oldVal = this.value;
    }).on("change", function (evt, params) {
    if (page_id == "verification") { changeChosen(this, evt, params, _oldVal); }
    });

    if (page_id == "verification") {
    validateChange("#" + rowID + " input[name='contact_name']");
    validateChange("#" + rowID + " input[name='contact_email']");
    validateChange("#" + rowID + " input[name='contact_im_account']");
    }*/
}

function populatePublication(id, fileName, description) {
    outputData = addPublication(id, fileName, description);
    var rowID = $(outputData).closest("tr").attr("id");
    $('#tblPublication tbody').append(outputData);

    /*if (page_id == "verification") {
    validateChange("input[name='publication_desc']");
    }*/
}

/* table insert row */
function addInstitution(id, institutionId, institutionName, roleId, roleName) {
    id = typeof (id) !== "undefined" ? id : "";
    var _eventType = $('input[name=eventType]:checked').val();
    var partnerText = "";
    if (_eventType == "4") {
        partnerText = "funder";
        partnerFunction = "funderPopUp";
    } else {
        partnerText = "institution";
        partnerFunction = "InstitutionPopUp";
    }
    partnerText = "institution";
    partnerFunction = "InstitutionPopUp";
    roleId = typeof (roleId) !== "undefined" ? ((roleId == "") ? "2" : roleId) : "";
    $uuid = guid();

    var _institutionData = [];
    _institutionData.push({ "key": institutionId, "text": institutionName })
    $cboInstitution = createCombobox("", "joint_institution_id", "joint_institution_id", _institutionData, institutionId);
    $cboRole = createCombobox("", "joint_role", "joint_role", partnerRole, roleId);
    $styleHidden = institutionId == "" ? "none" : "";

    $strOutput = "<tr id=\"institution_" + $uuid + "\">"
                        + "<td><input type=\"hidden\" name=\"joint_rec_id\" value=\"" + id + "\"/>"
                            + $cboInstitution
                            + " <a href=\"javascript:void(0);\" onclick=\""+partnerFunction+"('" + $uuid + "')\"> <img src=\"image/popup.gif\" alt=\"Pop Up "+partnerText+"\" title=\"Pop Up Institution\" /></a> <button type=\"button\" class=\"btn btn-success btn-xs btnDetail\" style=\"display:" + $styleHidden + "\">view detail "+partnerText+"</button> "
                        + "</td>"
                        + "<td>" + $cboRole + "</td>"
                        + "<td class=\"actions deleteButton\"><span class=\"label red\" data-original-title=\"delete partner\" title=\"delete partner\"><i class=\"icon-trash delete\"></i></span></td>"
                        + "</tr>";
    return $strOutput;
}

function addProject(id, projectId, projectName) {
    id = typeof (id) !== "undefined" ? id : "";
    $uuid = guid();

    var _projectData = [];
    _projectData.push({ "key": projectId, "text": projectName })
    $cboProject = createCombobox("", "project_id", "project_id span6", _projectData, projectId);

    $styleHidden = projectId == "" ? "none" : "";
    $strOutput = "<tr id=\"project_" + $uuid + "\">"
                        + "<td><input type=\"hidden\" name=\"project_rec_id\" value=\"" + id + "\"/>"
                            + $cboProject
                            + " <a href=\"javascript:void(0);\" onclick=\"ProjectPopUp('" + $uuid + "')\"> <img src=\"image/popup.gif\" alt=\"Pop Up Institution\" title=\"Pop Up Institution\" /></a> <button type=\"button\" class=\"btn btn-success btn-xs btnDetail\" style=\"display:" + $styleHidden + "\">view detail project</button> "
                        + "</td>"
                        + "<td class=\"actions deleteButton\"><span class=\"label red\" data-original-title=\"delete project\" title=\"delete project\"><i class=\"icon-trash delete\"></i></span></td>"
                        + "</tr>";
    return $strOutput;
}

function addEvent(id, type, eventId, name, manager, website, venue, startDate, endDate) {
    id = typeof (id) !== "undefined" ? id : "";
    if (startDate == null) {
        startDate = "";
    }
    if (endDate == null) {
        endDate = "";
    }
    var _readonly = "";
    $buttonEvent = "";
    if (type == "registered") {
        var idx = website.indexOf("http");
        if (idx != -1) {
            website = "<a href=\"" + website + "\" target=\"_blank\">" + website + "</a>"
        } else {
            website = "<a href=\"http://" + website + "\" target=\"_blank\">" + website + "</a>"
        }

        _readonly = "readonly";
        $buttonEvent = "<button type=\"button\" class=\"btn btn-success btn-xs btnDetail\">view detail event</button>";
        $nameEvent = "<a href=\"javascript:void(0);\" onClick=\"openEventDetail('" + eventId + "')\">" + name + "</a>";
        $manager = manager;
        $website = website;
        $venue = venue;
        $date = startDate + " - " + endDate;
    } else {
        $nameEvent = "<input type=\"text\" name=\"event_name\" class=\"span12\" value=\"" + name + "\"/> ";
        $manager = "<input type=\"text\" name=\"event_manager\" class=\"span12\" value=\"" + manager + "\" " + _readonly + "/>";
        $website = "<input type=\"text\" name=\"event_website\" class=\"span10\" value=\"" + website + "\" " + _readonly + "/>" + "&nbsp;<span class=\"action viewWebsite\"><i class=\"icon-globe icon-large\"></i></span>";
        $venue = "<input type=\"text\" name=\"event_venue\" class=\"span12\" value=\"" + venue + "\" " + _readonly + "/>";
        $date = "<input type=\"text\" name=\"event_startDate\" class=\"span5 re_startDate\" value=\"" + startDate + "\" " + _readonly + "/> - "
                            + "<input type=\"text\" name=\"event_endDate\" class=\"span5 re_endDate\" value=\"" + endDate + "\" " + _readonly + "/>";
    }
    $uuid = guid();

    $strOutput = "<tr id=\"event_" + $uuid + "\">"
                        + "<td class=\"warpCell\"><input type=\"hidden\" name=\"event_rec_id\" value=\"" + id + "\"/>"
                            + "<input type=\"hidden\" name=\"event_type\" value=\"" + type + "\"/>"
                            + "<input type=\"hidden\" name=\"event_id\" value=\"" + eventId + "\"/>"
                            + $nameEvent
    //+ "<input type=\"text\" name=\"event_name\" class=\"span12\" value=\"" + name + "\" " + _readonly + "/> " + $buttonEvent
                        + "</td>"
                        + "<td class=\"warpCell\">" + $manager + "</td>"
                        + "<td class=\"warpCell\">" + $website + "</td>"
                        + "<td class=\"warpCell\">" + $venue + "</td>"
                        + "<td class=\"warpCell\">" + $date + "</td>"
                        + "<td class=\"actions deleteButton\"><span class=\"label red\" data-original-title=\"delete event\" title=\"delete event\"><i class=\"icon-trash delete\"></i></span></td>"
                        + "</tr>";
    return $strOutput;
}

function addSuppDocument(id, fileName, description, type) {
    id = typeof (id) !== "undefined" ? id : "";
    var page_id = $("#page_id").val();
    $uuid = guid();

    $hidClass = page_id == "verification" ? "" : "hidden";

    type = (type == "") ? "1" : type;
    $cboType = createCombobox("", "suppDoc_type", "suppDoc_type " + $hidClass, documentType, type);
    if (id != "") {
        var typeName = "";
        switch (type) {
            case "1":
                typeName = "GENERAL"
                break;
            case "2":
                typeName = "ICG"
                break;
        }
        file_link = $("#fileUrl").val();
        $labelFileName = "<a href=\"" + file_link + encodeURIComponent(fileName) + "\" target='_blank'>" + fileName + "</a><input type='hidden' name='suppDoc_name' value=\"" + fileName + "\" />";
        $labelDescription = "<input type=\"text\" name=\"suppDoc_desc\" class=\"span12\" value=\"" + description + "\"/> ";
        $labelType = "<input type=\"hidden\" class=\"suppDoc_type\" name=\"suppDoc_type\" value=\"" + type + "\"/>" + typeName;
    } else {
        $labelFileName = "<input type='file' name='Sup_Doc' class='Sup_Doc'><input type='hidden' name='suppDoc_name' id='suppDoc_name" + $uuid + "'/>";
        $labelDescription = "<input type=\"text\" name=\"suppDoc_desc\" class=\"span12\" value=\"" + description + "\"/> ";
        $labelType = $cboType;
    }

    $strOutput = "<tr id=\"suppDoc_" + $uuid + "\">"
                        + "<td><input type=\"hidden\" name=\"suppDoc_rec_id\" value=\"" + id + "\"/>" + $labelDescription + "</td>"
                        + "<td>" + $labelFileName + "</td>"
                        + "<td class=\"" + $hidClass + "\">" + $labelType + "</td>"
                        + "<td class=\"actions deleteButton\"><input type=\"hidden\" name=\"fileSuppDoc\"/><span class=\"label red\" data-original-title=\"delete supporting document\" title=\"delete supporting document\"><i class=\"icon-trash delete\"></i></span></td>"
                        + "</tr>";
    return $strOutput;
}

/* ICG Involvment */
function addPublication(id, fileName, description) {
    id = typeof (id) !== "undefined" ? id : "";
    $uuid = guid();

    if (id != "") {
        file_link = $("#fileUrl").val();
        $labelFileName = "<a href=\"" + file_link + encodeURIComponent(fileName) + "\" target='_blank'>" + fileName + "</a><input type='hidden' name='publication_name' value=\"" + fileName + "\" />";
        $labelDescription = "<input type=\"hidden\" name=\"publication_desc\" value=\"" + description + "\"/>" + description;

    } else {
        $labelFileName = "<input type='file' name='Publication_Doc' class='Publication_Doc'><input type='hidden' name='publication_name' id='publication_name" + $uuid + "'/>";
        $labelDescription = "<input type=\"text\" name=\"publication_desc\" class=\"span12\" value=\"" + description + "\"/> ";
    }

    $strOutput = "<tr id=\"publication_" + $uuid + "\">"
                        + "<td><input type=\"hidden\" name=\"publication_rec_id\" value=\"" + id + "\"/>" + $labelDescription + "</td>"
                        + "<td>" + $labelFileName + "</td>"
                        + "<td class=\"actions deleteButton\"><input type=\"hidden\" name=\"filepublication\"/><span class=\"label red\" data-original-title=\"delete publication\" title=\"delete publication\"><i class=\"icon-trash delete\"></i></span></td>"
                        + "</tr>";
    return $strOutput;
}

function addPromotionContact(id, type, name, email, im_type, im_account) {
    id = typeof (id) !== "undefined" ? id : "";
    var _readonly = "";
    $uuid = guid();
    $cboIMType = createCombobox("", "contact_im_type", "contact_im_type", listIMType, im_type);

    $strOutput = "<tr id=\"" + type + "_" + $uuid + "\">"
                        + "<td><input type=\"hidden\" name=\"contact_rec_id\" value=\"" + id + "\"/>"
                            + "<input type=\"hidden\" name=\"contact_type\" value=\"" + type + "\"/>"
                            + "<input type=\"text\" name=\"contact_name\" class=\"span12\" value=\"" + name + "\"/> "
                        + "</td>"
                        + "<td><input type=\"email\" name=\"contact_email\" class=\"span12\" value=\"" + email + "\" /></td>"
                        + "<td>" + $cboIMType + "</td>"
                        + "<td><input type=\"text\" name=\"contact_im_account\" class=\"span12\" value=\"" + im_account + "\" /></td>"
                        + "<td class=\"actions deleteButton\"><span class=\"label red\" data-original-title=\"delete contact\" title=\"delete contact\"><i class=\"icon-trash delete\"></i></span></td>"
                        + "</tr>";
    return $strOutput;
}