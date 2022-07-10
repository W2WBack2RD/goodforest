import React from "react";
import PageLayout from "../../organisms/PageLayout";
import Button from "react-bulma-companion/lib/Button";
import Title from "react-bulma-companion/lib/Title";
import updateFaultReporting from "_assets/images/updateFaultReporting.svg";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";

window.Buffer = Buffer;

export default function UpdatingFaultReportingPage() {

  return (
    <PageLayout className="homePage" titleStyle={false} title="דיווח על תקלה">
      <div className="UpdateFaultReportingPage">
        <div>
          <img
            id="updateFaultTree"
            src={updateFaultReporting}
            style={{ height: 199, width: 179 }}
          />
        </div>
        <Title id="updateTitleReporting" size="6" className="header">
          תודה על העדכון!
        </Title>
        <Title id="paragrahUpdateReporting" size="6" className="header">
          דיווחים שוטפים על מצב העצים עוזרים לשמור על החלקה ולעודד את הצמיחה של
          העצים.
        </Title>

        <div className="form-footer">
          <Link to="/home">
            <Button id="home-page-navigation">
              לדף הבית
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
