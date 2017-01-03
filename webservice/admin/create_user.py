import sys

from shared import db
from models import UserModel

def usage():
    sys.stderr.write('usage: create_user.py username password\n')

def main():
    if len(sys.argv) != 3:
        usage()
        sys.exit(0)

    new_user = UserModel()
    new_user.username = sys.argv[1]
    new_user.set_password(sys.argv[2])
    new_user.admin = True

    db.session.add(new_user)
    db.session.commit()

if __name__ == '__main__':
    main()
